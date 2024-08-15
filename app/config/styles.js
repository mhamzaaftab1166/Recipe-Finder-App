import { Platform, StyleSheet } from "react-native";
import colors from "./colors";
const styles = StyleSheet.create({
  colors,
  text: {
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
    color: colors.dark,
  },
});
export default styles;
