import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";

const FundScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerHeader title="Fund Account" />
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default FundScreen;
