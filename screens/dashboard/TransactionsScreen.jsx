import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const TransactionScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerHeader title="Transactions" />
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <MaterialCommunityIcons
          name="gauge-empty"
          size={45}
          color="black"
          style={{ alignSelf: "center" }}
        />
        <Text style={{ textAlign: "center", fontSize: 13, marginVertical: 10 }}>
          Seems you're quite low on transactions
        </Text>
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

export default TransactionScreen;
