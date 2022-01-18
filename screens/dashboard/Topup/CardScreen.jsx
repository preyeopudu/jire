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
import { useSelector, useDispatch } from "react-redux";
import { FUNDACCOUNT } from "../../../API/Fund-api";
import { GETCOUNTRIES, GETTOKEN } from "../../../API/Top-api";
import { Loading } from "../../../components/Loading";

import {
  StripeProvider,
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import { Button } from "react-native-paper";
import { USER } from "../../../API/Auth-api";
import { LogIn } from "../../../store/actions";

const CardScreen = () => {
  return (
    <StripeProvider publishableKey="pk_live_51KA1MJHS52jZDXV1U3C7om2rUB2mPj57OgE2T1g2zI98AQ9gtvs5X4qphHlSQQ7ezmOsX5Hm358bZezaHUKoRsGb005qSFABiD">
      <TopUp />
    </StripeProvider>
  );
};

const TopUp = () => {
  const user = useSelector((s) => s.UserReducer[0]);
  const userToken = useSelector((s) => s.UserReducer[1]);
  const [maskedValue, setMaskedValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { confirmPayment } = useConfirmPayment();
  const [currency, setCurrency] = useState();
  const [countries, setCountries] = useState();
  const [token, setToken] = useState();
  const stripe = useStripe();

  useEffect(async () => {
    setLoading(true);
    const GetToken = await GETTOKEN();
    setToken(GetToken.data.token);
    const GetCountries = await GETCOUNTRIES(token);
    setCountries(GetCountries.data);
    setLoading(false);
  }, []);

  const HandlePayment = async () => {
    setLoading(true);
    if (!cardDetails?.complete || amount) {
      Alert.alert("Please complete form ");
      setLoading(false);
      return;
    } else {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardDetails,
      });

      if (!error) {
        if (countries) {
          const foundCountry = countries.find((country) => {
            return country.currencyCode === user.currency;
          });
          if (foundCountry) {
            setCurrency(foundCountry);
          }
        }
        try {
          setLoading(true);
          const Fund = await FUNDACCOUNT({
            token: userToken,
            amount,
            id,
            currency: currency.currencyCode,
          });

          const getuser = await USER(userToken);
          dispatch(LogIn(getuser.data.user, userToken));
          setLoading(false);
          Alert.alert("Succesfully sent!");
          console.log(Fund);
        } catch (err) {
          console.log(err);
          Alert.alert("An error occured", `${err} occured`);
          setLoading(false);
        }
      } else {
        Alert.alert(
          `An error occured ${error.type}`,
          `${error.localizedMessage}`
        );
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

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
                placeholder="Amount "
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
