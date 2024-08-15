import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { Ionicons } from "@expo/vector-icons";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  // Check if instructions are available and format them
  let formattedInstructions;
  if (recipe.instructions && recipe.instructions.trim() !== "") {
    formattedInstructions = recipe.instructions
      .split("\n")
      .map((step, index) => (
        <Text key={index} style={styles.instructionStep}>
          {`${index + 1}. ${stripHtmlTags(step)}`}
        </Text>
      ));
  } else {
    formattedInstructions = (
      <Text style={styles.noInstructions}>No instructions available.</Text>
    );
  }

  // Formatting ingredients
  const formattedIngredients = recipe.extendedIngredients.map(
    (ingredient, index) => (
      <View key={index} style={styles.ingredientItem}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text
          style={styles.ingredientDetails}
        >{`${ingredient.amount} ${ingredient.unit}`}</Text>
      </View>
    )
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: recipe.image }} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{recipe.title}</AppText>
        <AppText style={styles.summary}>
          {stripHtmlTags(recipe.summary)}
        </AppText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AppText style={{ color: colors.danger }}>
            Score: {recipe.healthScore}
          </AppText>
          <AppText style={{ color: colors.danger }}>
            Cook Time: {recipe.readyInMinutes}
          </AppText>
          <AppText style={{ color: colors.danger }}>
            Price: {recipe.pricePerServing}
          </AppText>
        </View>
        {/* Ingredients List */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {formattedIngredients}
        </View>
        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          {formattedInstructions}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  summary: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: "bold",
    marginVertical: 12,
  },
  ingredientsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientDetails: {
    fontSize: 16,
    color: colors.medium,
  },
  instructionsContainer: {
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  instructionStep: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  noInstructions: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});
