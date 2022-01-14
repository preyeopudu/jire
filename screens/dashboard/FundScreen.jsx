import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import DrawerHeader from "../../components/DrawerHeader";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const Card = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: "#044CAC",
        width: "90%",
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 20,
      }}
      onPress={() => {
        props.onPress();
      }}
    >
      <View>
        <Text
          style={{
            paddingVertical: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#fff",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TopUpScreen = () => {
  const token = useSelector((s) => s.UserReducer[1]);
  const { navigate } = useNavigation();
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <DrawerHeader title="Fund Account" />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
          <Card
            onPress={() => {
              navigate("card");
            }}
            title="Pay with Card"
          />
          <Card
            onPress={() => {
              Alert.alert("Not available yet", "coming soon");
            }}
            title="Fund with Bitcoin"
          />
          <Card
            onPress={() => {
              Alert.alert("Not available yet", "coming soon");
            }}
            title="Fund with Paypal"
          />
          <Card
            onPress={() => {
              Alert.alert("Not available yet", "coming soon");
            }}
            title="Bank Transfer"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default TopUpScreen;
