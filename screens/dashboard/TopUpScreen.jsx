import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Action from "../../components/Action";
import { useEffect } from "react";
import { GETCOUNTRIES, GETOPERATORS, GETTOKEN } from "../../API/Top-api";
import { Picker } from "@react-native-picker/picker";
import { Loading } from "../../components/Loading";

const TopUpScreen = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState();
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [operator, setOperator] = useState();
  console.log(country);
  useEffect(async () => {
    const GetToken = await GETTOKEN();
    setToken(GetToken.data.token);
  }, []);

  useEffect(async () => {
    const GetCountries = await GETCOUNTRIES(token);
    setCountries(GetCountries.data);
    setLoading(false);
  }, [token]);

  useEffect(async () => {
    const GetOperator = await GETOPERATORS(token, country);
    console.log(GetOperator);
  }, [country]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}
    >
      <TouchableWithoutFeedback
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <DrawerHeader title="Top Up" />

          <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
            <Text
              style={{ fontSize: 15, marginHorizontal: 7, marginBottom: 10 }}
            >
              Select country
            </Text>
            <View
              style={{
                borderColor: "#cdcdcd",
                borderRadius: 10,
                borderWidth: 1,
                paddingHorizontal: 5,
                paddingVertical: 2,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => {
                  setCountry(itemValue);
                }}
              >
                {countries.map((list, index) => (
                  <Picker.Item
                    label={list.name}
                    value={list.isoName}
                    key={index}
                  />
                ))}
              </Picker>
            </View>

            <Text style={{ fontSize: 15, marginHorizontal: 7, marginTop: 30 }}>
              Set up Phone number
            </Text>

            <View
              style={{
                borderColor: "#cdcdcd",
                borderRadius: 10,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 12,
                marginTop: 15,
                fontSize: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>+</Text>
              <TextInput
                style={{
                  marginHorizontal: 7,

                  fontSize: 18,
                }}
                placeholder="Phone number"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <Action title="Submit" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default TopUpScreen;
