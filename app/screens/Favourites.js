import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import colors from "../config/colors";

const Favourites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteRecipes = await AsyncStorage.getItem("favorites");
        if (favoriteRecipes) {
          setFavorites(JSON.parse(favoriteRecipes));
        }
      } catch (e) {
        console.error("Failed to fetch favorites", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorite recipes yet.</Text>
      ) : (
        favorites.map((recipe, index) => (
          <Card
            onPress={() => navigation.navigate("recipeDetails", { recipe })}
            key={index}
            title={recipe.title}
            subTitle={recipe.summary.replace(/<[^>]+>/g, "")}
            price={recipe.pricePerServing}
            imageUrl={recipe.image}
            recipe={recipe}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoritesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});
