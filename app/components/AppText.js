import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";
function AppText({ children, style, ...otherProps }) {
  return (
    <Text {...otherProps} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     fontWeight: "400",
//     textTransform: "capitalize",
//     ...Platform.select({
//       ios: {
//         fontSize: 20,
//         fontFamily: "Avenir",
//       },
//       android: {
//         fontSize: 20,
//         fontFamily: "Roboto",
//       },
//     }),
//   },
// });

export default AppText;
