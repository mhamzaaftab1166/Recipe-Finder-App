import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
const Stack = createStackNavigator();
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        options={{ headerTitle: "Home" }}
        name="recipe"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Recipe Detail" }}
        name="recipeDetails"
        component={RecipeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
