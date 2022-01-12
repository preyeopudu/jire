import React from "react";
import { ActivityIndicator, View, Modal } from "react-native";

export const Loading = (props) => {
  return (
    <Modal transparent visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <ActivityIndicator color="#42526E" size="large" />
        </View>
      </View>
    </Modal>
  );
};
