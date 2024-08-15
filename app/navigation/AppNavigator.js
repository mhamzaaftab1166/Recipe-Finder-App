import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeNavigator from "./HomeNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="dots-horizontal-circle"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
        name="Other"
        component={AccountNavigator}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
