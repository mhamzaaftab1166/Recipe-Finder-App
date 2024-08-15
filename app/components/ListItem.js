import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image}></Image>}
          <View style={styles.detailsContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {title}
            </AppText>
            {subTitle && (
              <AppText numberOfLines={2} style={styles.subTitle}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  detailsContainer: { flex: 1, marginLeft: 15, justifyContent: "center" },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.medium,
  },
});
export default ListItem;
