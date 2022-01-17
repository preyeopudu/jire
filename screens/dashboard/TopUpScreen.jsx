import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { useSelector } from "react-redux";
import Action from "../../components/Action";
import { useEffect } from "react";
import {
  GETCOUNTRIES,
  GETOPERATORS,
  GETOPERATORSID,
  GETTOKEN,
  RECHARGE,
} from "../../API/Top-api";
import { Picker } from "@react-native-picker/picker";
import { Loading } from "../../components/Loading";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";

const TopUpScreen = () => {
  const [token, setToken] = useState();
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [showloading, setShowLoading] = useState(false);
  const [operators, setOperators] = useState();
  const [operator, setOperator] = useState();
  const [showOperator, setShowOperator] = useState(false);
  const [showOperators, setShowOperators] = useState(false);
  const [callingCodes, setCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [prices, setPrices] = useState("");
  const [amount, setAmount] = useState(0);
  const [amounts, setAmounts] = useState();
  const [showInput, setShowInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const user = useSelector((s) => s.UserReducer[0]);

  const HandlePayment = async () => {
    setLoading(true);
    console.log(amount);
    console.log(operatorId);
    console.log(callingCodes + phoneNumber);
    if (amount === 0 || operatorId === "" || phoneNumber === "") {
      Alert.alert("Incomplete details", "Kindly retry");
      setLoading(false);
    } else if (amount > user.creditBalance || user.creditBalance - amount < 0) {
      setLoading(false);
      Alert.alert("Insufficient balance", "kindly refill");
    } else {
      const Recharge = await RECHARGE(token, {
        amount: amount,
        operatorId: operatorId,
        recipientPhone: callingCodes + phoneNumber,
      });

      setLoading(false);
      Alert.alert("Request succesfully sent");
    }
  };

  const getOperatorId = (id) => {
    setShowInput(false);
    setOperatorId(id);
  };

  useEffect(async () => {
    setShowInput(false);
    setShowOperator(false);
    const GetToken = await GETTOKEN();
    setToken(GetToken.data.token);
  }, []);

  useEffect(async () => {
    setShowInput(false);

    const GetCountries = await GETCOUNTRIES(token);
    setCountries(GetCountries.data);
    setLoading(false);
  }, [token]);

  useEffect(async () => {
    setShowInput(false);
    if (token && country) {
      setShowLoading(true);
      const GetOperator = await GETOPERATORS(token, country);
      setOperators(GetOperator.data);
      if (countries) setShowLoading(false);
      setShowOperators(true);
    }

    if (countries && country) {
      const found = countries.find((c) => c.isoName == country);
      if (found) {
        setCode(found.callingCodes[0]);
        setShowInput(false);
      }
    }
  }, [country]);

  useEffect(async () => {
    setShowInput(false);
    if (operatorId) {
      setShowLoading(true);
      const GetOperatorId = await GETOPERATORSID(token, operatorId);
      setOperator(GetOperatorId.data);
      setShowInput(false);
      console.log(operator);
      if (Object.values(operator.suggestedAmountsMap).length > 0) {
        console.log(operator.suggestedAmountsMap);
        setShowOperator(true);
        setShowInput(false);
        console.log(Object.values(operator.suggestedAmountsMap));
        setAmounts(Object.values(operator.suggestedAmountsMap));
        console.log(amounts);
        setShowOperators(false);
        setShowInput(false);
      } else if ((Object.values(operator.suggestedAmountsMap).length = 0)) {
        setShowInput(true);
        setShowOperators(false);
        setShowOperator(false);
      }
      setShowLoading(false);
    }
  }, [operatorId]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getOperatorId(item.operatorId);
        }}
        style={{ marginHorizontal: 10 }}
      >
        <Image
          style={{
            width: 50,
            alignSelf: "center",
            height: 50,
            borderRadius: 100,
          }}
          source={{ uri: item.logoUrls[0] }}
          alt="avatar"
        />
        <Text style={{ fontSize: 11, textAlign: "center", marginTop: 10 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const Price = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAmount(item);
        }}
        key={uuidv4()}
        activeOpacity={0.8}
        style={{
          borderRadius: 10,
          width: 100,
          margin: 20,
        }}
      >
        <View style={{ backgroundColor: "#044CAC", width: "100%" }}>
          <Text
            style={{
              paddingVertical: 20,
              textAlign: "center",
              fontSize: 22,
              color: "#fff",
              width: "100%",
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

            {showInput ? (
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
                <TextInput
                  onChangeText={(val) => {
                    setAmount(val);
                  }}
                  style={{
                    marginHorizontal: 7,
                    fontSize: 18,
                  }}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
              </View>
            ) : null}

            {showOperators ? (
              showloading ? (
                <View style={{ marginVertical: 40 }}>
                  <ActivityIndicator color="#42526E" size="large" />
                </View>
              ) : (
                <View style={{ marginTop: 40, marginBottom: 30 }}>
                  <FlatList
                    data={operators}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )
            ) : null}

            {showOperator ? (
              showloading ? (
                <View style={{ marginVertical: 40 }}>
                  <ActivityIndicator color="#42526E" size="large" />
                </View>
              ) : (
                <View style={{ marginTop: 40, marginBottom: 30 }}>
                  <FlatList
                    data={amounts}
                    renderItem={Price}
                    keyExtractor={(item) => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )
            ) : null}
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
              <Text style={{ fontSize: 18 }}>{callingCodes}</Text>
              <TextInput
                onChangeText={(val) => {
                  setPhoneNumber(val);
                }}
                style={{
                  marginHorizontal: 7,

                  fontSize: 18,
                }}
                placeholder="Phone number"
                keyboardType="numeric"
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <Action title="Submit" onPress={HandlePayment} />
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
