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
import colors from "../config/colors";
import { SelectList } from "react-native-dropdown-select-list";

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [mealTypes, setMealTypes] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState("");

  const apiKey = "f10137d73cde429badd1d15074502dfe";

  // Meal Types Data
  const mealTypeOptions = [
    { key: "main course", value: "Main Course" },
    { key: "side dish", value: "Side Dish" },
    { key: "dessert", value: "Dessert" },
    { key: "appetizer", value: "Appetizer" },
    { key: "salad", value: "Salad" },
    { key: "bread", value: "Bread" },
    { key: "breakfast", value: "Breakfast" },
    { key: "soup", value: "Soup" },
    { key: "beverage", value: "Beverage" },
    { key: "sauce", value: "Sauce" },
    { key: "marinade", value: "Marinade" },
    { key: "fingerfood", value: "Fingerfood" },
    { key: "snack", value: "Snack" },
    { key: "drink", value: "Drink" },
    { key: "clear", value: "Clear" },
  ];

  // Fetch Cuisine Types
  const fetchCuisineTypes = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=50`
      );
      const uniqueCuisines = [
        ...new Set(
          response.data.recipes.map((recipe) => recipe.cuisines).flat()
        ),
      ];
      const cuisineOptions = uniqueCuisines.map((cuisine, index) => ({
        key: index.toString(),
        value: cuisine,
      }));
      setCuisineTypes([{ key: "clear", value: "Clear" }, ...cuisineOptions]);
    } catch (error) {
      console.error("Failed to fetch cuisine types", error);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchCuisineTypes();
    fetchRecipes(page);
  }, [fetchCuisineTypes, fetchRecipes, page]);

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

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleCuisineChange = (val) => {
    if (val === "Clear") {
      setSelectedCuisine("");
      setRecipes([]); // Clear current recipes
      setPage(1); // Reset to the first page
      fetchRecipes(1); // Fetch recipes without any cuisine filter
    } else {
      setSelectedCuisine(val);
      filterRecipesByCuisineAndMealType(val, selectedMealType);
    }
  };

  const handleMealTypeChange = (val) => {
    if (val === "clear") {
      setSelectedMealType("");
      setRecipes([]); // Clear current recipes
      setPage(1); // Reset to the first page
      fetchRecipes(1); // Fetch recipes without any meal type filter
    } else {
      setSelectedMealType(val);
      filterRecipesByCuisineAndMealType(selectedCuisine, val);
    }
  };

  const filterRecipesByCuisineAndMealType = useCallback(
    async (cuisine, mealType) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              cuisine: cuisine,
              type: mealType,
              number: 30,
            },
          }
        );
        setRecipes(response.data.results);
      } catch (e) {
        setError("Failed to fetch recipes for selected filters.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

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
        <View style={styles.dropDownContainer}>
          <View style={styles.clusterDropdown}>
            <SelectList
              setSelected={handleCuisineChange}
              data={cuisineTypes}
              save="value"
              placeholder="Cuisine Type"
              dropdownStyles={styles.dropdownStyles}
              boxStyles={styles.boxStyles}
              inputStyles={{ color: colors.white }}
            />
          </View>
          <View style={styles.clusterDropdown}>
            <SelectList
              setSelected={handleMealTypeChange}
              data={mealTypeOptions}
              save="value"
              placeholder="Meal Type"
              dropdownStyles={styles.dropdownStyles}
              boxStyles={styles.boxStyles}
              inputStyles={{ color: colors.white }}
            />
          </View>
        </View>
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
                subTitle={recipe.summary?.replace(/<[^>]+>/g, "")}
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
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  clusterDropdown: {
    width: "48%",
    borderRadius: 12,
  },
  dropdownStyles: {
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderWidth: 2,
  },
  boxStyles: {
    backgroundColor: colors.primary,
    color: colors.light,
  },
});

export default HomeScreen;
