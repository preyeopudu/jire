import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const SupportScreen = () => {
  const messager = () => {
    Linking.openURL("mailto: support@jiretopup.com");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerHeader title="Support" />
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            messager();
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#044CAC",
              alignItems: "center",
              alignSelf: "center",
              paddingVertical: 15,
              borderRadius: 20,
            }}
          >
            <FontAwesome name="send-o" size={27} color="white" />
          </View>
        </TouchableOpacity>
      </View>
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

export default SupportScreen;
