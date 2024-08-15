import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

function Card({ title, subTitle, imageUrl, price, onPress, recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favoriteRecipes = await AsyncStorage.getItem("favorites");
      if (favoriteRecipes) {
        const favoritesArray = JSON.parse(favoriteRecipes);
        const isFav = favoritesArray.some(
          (favRecipe) => favRecipe.id === recipe.id
        );
        setIsFavorite(isFav);
      }
    };

    checkFavoriteStatus();
  }, [recipe]);

  const toggleFavorite = async () => {
    try {
      const favoriteRecipes = await AsyncStorage.getItem("favorites");
      let favoritesArray = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter(
          (favRecipe) => favRecipe.id !== recipe.id
        );
      } else {
        favoritesArray.push(recipe);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error("Failed to update favorites", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{ uri: imageUrl }}
        />
        <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={{ color: "red", fontSize: 15 }}>{price}</AppText>
          </View>
          <AppText numberOfLines={2} style={styles.subTitle}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default Card;
