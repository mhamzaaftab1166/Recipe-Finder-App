import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Card from "../components/Card";
import SafeScreen from "../components/SafeScreen";
import colors from "../config/colors";

const HomeScreen = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = "f10137d73cde429badd1d15074502dfe";

  // Fetch recipes function
  const fetchRecipes = useCallback(
    async (pageNumber) => {
      setLoading(pageNumber === 1); // Set loading to true only for the first page
      setLoadingMore(pageNumber > 1); // Set loadingMore to true for subsequent pages

      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=30&offset=${
            (pageNumber - 1) * 10
          }`
        );
        const newRecipes = response.data.recipes;

        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
        setError(null);

        // Check if there are more recipes to load
        if (newRecipes.length < 30) {
          setHasMore(false);
        }
      } catch (e) {
        setError("Failed to fetch recipes. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [apiKey]
  );

  useEffect(() => {
    fetchRecipes(page);
  }, [fetchRecipes, page]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        {loading ? (
          <Text style={styles.loadingText}>Loading recipes...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredRecipes.length === 0 ? (
          <Text style={styles.noResultsText}>No recipes found</Text>
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              const { contentOffset, layoutMeasurement } = nativeEvent;
              const contentHeight = contentOffset.y + layoutMeasurement.height;
              const isCloseToBottom =
                contentHeight >= layoutMeasurement.height * 1.5;
              if (isCloseToBottom) {
                handleLoadMore();
              }
            }}
            scrollEventThrottle={400}
          >
            {filteredRecipes.map((recipe, index) => (
              <Card
                onPress={() => navigation.navigate("recipeDetails", { recipe })}
                key={index}
                title={recipe.title}
                subTitle={recipe.summary.replace(/<[^>]+>/g, "")}
                price={recipe.pricePerServing}
                imageUrl={recipe.image}
                recipe={recipe}
              />
            ))}
            {loadingMore && (
              <ActivityIndicator size="large" color={colors.primary} />
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  noResultsText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default HomeScreen;
