import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../../components/DrawerHeader";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Action from "../../../components/Action";
import axios from "axios";
import { useSelector } from "react-redux";
import { FUNDACCOUNT } from "../../../API/Fund-api";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Button } from "react-native-paper";

const CardScreen = () => {
  const token = useSelector((s) => s.UserReducer[1]);
  return (
    <StripeProvider publishableKey="pk_live_51KA1MJHS52jZDXV1U3C7om2rUB2mPj57OgE2T1g2zI98AQ9gtvs5X4qphHlSQQ7ezmOsX5Hm358bZezaHUKoRsGb005qSFABiD">
      <TopUp />
    </StripeProvider>
  );
};

const TopUp = () => {
  const token = useSelector((s) => s.UserReducer[1]);
  const [maskedValue, setMaskedValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const HandlePayment = async () => {
    if (!cardDetails?.complete || amount) {
      Alert.alert("Please complete form ");
      return;
    }
    const Fund = await FUNDACCOUNT(token, cardDetails);
    console.log(Fund);
  };

  useEffect(() => {});
  return (
    <ScrollView
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
        <View>
          <DrawerHeader title="Fund Account" />

          <View style={{ width: "90%", alignSelf: "center" }}>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  width: "100%",
                  fontSize: 18,
                  paddingVertical: 15,
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 25,
                }}
                placeholder="Amount in Dollars"
                keyboardType="numeric"
              />
            </View>

            <CardField
              postalCodeEnabled={true}
              placeholder={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
              }}
            />
            <View style={{ marginVertical: 40 }}>
              <Action
                title="Pay with card"
                onPress={() => {
                  HandlePayment();
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },

  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default CardScreen;
