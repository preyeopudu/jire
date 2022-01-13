import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { MaskedTextInput, Masks } from "react-native-mask-text";
import Action from "../../components/Action";
import { useEffect } from "react";
import { GETCOUNTRIES, GETOPERATORS, GETTOKEN } from "../../API/Top-api";
import { Picker } from "@react-native-picker/picker";
import { Loading } from "../../components/Loading";
import DropDownPicker from "react-native-dropdown-picker";

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
