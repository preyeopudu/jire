import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Action = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      activeOpacity={0.9}
      style={[{ backgroundColor: "#044CAC", borderRadius: 5 }, props.style]}
    >
      <View
        style={{
          paddingVertical: 13,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 25,
            letterSpacing: 3,
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Action;
