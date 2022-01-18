import React, { useState } from "react";
import { View, Text, Keyboard, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { TextInput } from "react-native-paper";
import { MaskedTextInput, Masks } from "react-native-mask-text";
import { useSelector } from "react-redux";
import Action from "../../components/Action";
import { PROFILE } from "../../API/Auth-api";
import { Loading } from "../../components/Loading";

const AccountScreen = () => {
  const user = useSelector((s) => s.UserReducer[0]);
  const token = useSelector((s) => s.UserReducer[1]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleProfile = () => {
    setLoading(true);
    if (phoneNumber == "") {
      Alert.alert("No details filled");
      setLoading(false);
    } else {
      const Profile = PROFILE(token, {
        currency: user.currency,
        timezone: user.timezone,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: phoneNumber,
        address: user.address,
        country: user.country,
      });
      setLoading(false);
      Alert.alert("Succesfully updated");
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style>
          <DrawerHeader title="My Profile" />
          <View style={{ marginHorizontal: 15 }}>
            <TextInput
              mode="outlined"
              editable={false}
              style={{
                backgroundColor: "#fff",
                color: "black",
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              label="First Name"
              value={user.firstName}
              keyboardType="numeric"
              activeOutlineColor="#044CAC"
              selectionColor="#044CAC"
            />
            <TextInput
              mode="outlined"
              editable={false}
              style={{
                backgroundColor: "#fff",
                color: "black",
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              label="Last Name"
              value={user.lastName}
              keyboardType="numeric"
              activeOutlineColor="#044CAC"
              selectionColor="#044CAC"
            />
            <TextInput
              mode="outlined"
              editable={false}
              style={{
                backgroundColor: "#fff",
                color: "black",
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              label="Email"
              value={user.email}
              keyboardType="numeric"
              activeOutlineColor="#044CAC"
              selectionColor="#044CAC"
            />
            <TextInput
              mode="outlined"
              editable={false}
              style={{
                backgroundColor: "#fff",
                color: "black",
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              label="Transactions"
              value={`${user.transactions.length}`}
              activeOutlineColor="#044CAC"
              selectionColor="#044CAC"
            />
            <TextInput
              mode="outlined"
              style={{
                backgroundColor: "#fff",
                color: "black",
                fontSize: 18,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              label="Phone Number"
              keyboardType="numeric"
              activeOutlineColor="#044CAC"
              selectionColor="#044CAC"
              onChangeText={(val) => {
                setPhoneNumber(val);
              }}
            />

            <View style={{ marginVertical: 20 }}>
              <Action
                title="Update"
                onPress={() => {
                  HandleProfile();
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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

export default AccountScreen;
