import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Icon({
  name,
  size = 42,
  backgroundColor = "#000",
  iconColor = "white",
}) {
  return (
    <View
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={name}
        color={iconColor}
        size={size * 0.5}
      ></MaterialCommunityIcons>
    </View>
  );
}

export default Icon;
