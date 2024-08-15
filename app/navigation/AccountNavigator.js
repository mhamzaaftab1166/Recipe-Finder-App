import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import AccountScreen from "../screens/AccountScreen";
import Favourites from "../screens/Favourites";
const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen
        name="fav"
        options={{ headerTitle: "My Favourites" }}
        component={Favourites}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
