import React from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ScaledSheet } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../store/actions/index.js";

const CustomDrawer = (props) => {
  const user = useSelector((s) => s.UserReducer);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(LogOut());
  };
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingTop: 40,
            paddingBottom: 15,
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 140,
              height: 140,
              marginBottom: 10,
              borderRadius: 1000,
            }}
            source={require("../assets/avatar.png")}
          />

          <Text
            style={{
              marginTop: 10,
              fontSize: 35,
              color: "black",
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>

        <View
          style={{
            margin: 20,
            borderTopColor: "#D3D3D3",
            borderTopWidth: 1,
            paddingTop: 20,
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Feather name="log-out" size={24} color="black" />
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 18,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: { flexDirection: "row", alignItems: "center" },
});

export default CustomDrawer;
