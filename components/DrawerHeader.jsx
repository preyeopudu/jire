import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";

const DrawerHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, fontWeight: "bold", color: "#fff" }}>
        {props.title}
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome5 name="bars" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 30,
    alignItems: "flex-start",
    paddingHorizontal: 30,
    backgroundColor: "#044CAC",
  },
});

export default DrawerHeader;
