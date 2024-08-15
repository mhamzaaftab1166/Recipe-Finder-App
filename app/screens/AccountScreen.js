import React from "react";
import ListItem from "../components/ListItem";
import { FlatList, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeprator from "../components/ListItemSeprator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const menuItems = [
  {
    title: "Favourite Recipes",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Report",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];
function AccountScreen({ navigation }) {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ListItem
          title={"Muhammad Hamza Aftab"}
          subTitle={"mhamzaaftab1166@gmail.com"}
          image={require("../assets/m3.jpeg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                ></Icon>
              }
              onPress={() => navigation.navigate("fav")}
            ></ListItem>
          )}
          ItemSeparatorComponent={ListItemSeprator}
        ></FlatList>
      </View>
      <ListItem
        title={"Log Out"}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d"></Icon>}
      ></ListItem>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
export default AccountScreen;
