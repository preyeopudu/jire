import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ScaledSheet, scale } from "react-native-size-matters";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, LogOut } from "../../store/actions/index.js";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Loading } from "../../components/Loading.jsx";
import { REGISTER, USER } from "../../API/Auth-api.js";

const RegistrationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, SetFirstName] = useState();
  const [lastName, SetLastName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (
      email === undefined ||
      password === undefined ||
      lastName === undefined ||
      firstName === undefined
    ) {
      Alert.alert("REGISTRATION ERROR", "You skipped a field");
    } else {
      setLoading(true);
      const register = await REGISTER({
        email: email,
        password: password,
        lastName: lastName,
        firstName: firstName,
      });
      if (!register.data) {
        if (register.err == "Network error") {
          setLoading(false);
          Alert.alert("Unable to connect", "check internet settings");
        } else if (register.err == "401") {
          Alert.alert("Email already used", "Try another!");
        }
      } else if (register.data) {
        setLoading(false);
        const getuser = await USER(register.data.token);
        dispatch(LogIn(getuser.data.user));
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <TouchableWithoutFeedback
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, marginTop: 40 }}>
            <Image
              style={{
                width: 300,
                height: 300,

                alignSelf: "center",
              }}
              source={require("../../assets/credit.png")}
            />
            <View style={styles.formContainer}>
              <View>
                <View style={styles.collectorContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="First Name"
                      style={styles.input}
                      onChangeText={(val) => SetFirstName(val)}
                    />
                    <MaterialIcons
                      name="verified-user"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>

                <View style={styles.collectorContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Last Name"
                      style={styles.input}
                      onChangeText={(val) => SetLastName(val)}
                    />
                    <MaterialIcons
                      name="verified-user"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>

                <View style={styles.collectorContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email Address"
                      style={styles.input}
                      onChangeText={(val) => SetEmail(val)}
                    />
                    <Ionicons name="md-mail" size={24} color="black" />
                  </View>
                </View>

                <View style={styles.collectorContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={true}
                      style={styles.input}
                      onChangeText={(val) => SetPassword(val)}
                    />
                    <Ionicons name="ios-lock-closed" size={24} color="black" />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit();
              }}
            >
              <LinearGradient
                colors={["#0166fe", "#031a3c"]}
                style={[styles.signIn, { borderRadius: 20, width: "100%" }]}
              >
                <View style={styles.buttonContainer}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "white",
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                        paddingVertical: 15,
                        fontSize: 20,
                      },
                    ]}
                  >
                    Sign-Up
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  fontSize: scale(12),
                  color: "#42526E",
                }}
              >
                Have an account?
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigate("Login");
                  }}
                >
                  <Text style={{ fontSize: scale(12), color: "#42526E" }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Loading visible={loading} />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default RegistrationScreen;

const styles = ScaledSheet.create({
  inputContainer: {
    backgroundColor: "#FAFBFC",
    borderBottomWidth: 1,
    borderColor: "#DFE1E6",
    borderRadius: 2,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  input: {
    fontSize: "14@s",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "85%",
  },
  buttonContainer: {
    marginTop: 50,
  },
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 40,
    letterSpacing: 8,
    color: "#0166fe",
  },
  bottomContainer: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 30,
  },

  buttonContainer: {
    width: "300@s",
  },
  collectorContainer: {
    marginVertical: 13,
  },
  label: {
    color: "#A9A9A9",
    marginBottom: 5,
  },
});
