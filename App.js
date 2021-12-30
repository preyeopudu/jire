import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./stacks/index";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HomeStack />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
