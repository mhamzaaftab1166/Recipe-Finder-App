import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import Card from "../components/Card";
import SafeScreen from "../components/SafeScreen";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //API key
  const apiKey = "f10137d73cde429badd1d15074502dfe";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`
        );
        setRecipes(response.data.recipes);
        setError(null);
      } catch (e) {
        setError("Failed to fetch recipes. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeScreen>
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
          <ScrollView>
            {filteredRecipes.map((recipe, index) => (
              <Card
                key={index}
                title={recipe.title}
                subTitle={recipe.summary.replace(/<[^>]+>/g, "")}
                price={recipe.pricePerServing}
                imageUrl={recipe.image}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
