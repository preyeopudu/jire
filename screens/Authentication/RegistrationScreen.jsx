import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
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

const RegistrationScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(LogIn());
  };

  return (
    <View style={styles.container}>
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
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 1000,
              alignSelf: "center",
              marginTop: 20,
            }}
            source={require("../../assets/logo.png")}
          />

          <View style={styles.formContainer}>
            <View>
              <View style={styles.collectorContainer}>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Username" style={styles.input} />
                </View>
              </View>

              <View style={styles.collectorContainer}>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Email ID" style={styles.input} />
                </View>
              </View>

              <View style={styles.collectorContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    style={styles.input}
                  />
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
                style={[styles.signIn, { borderRadius: 12, width: "100%" }]}
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
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RegistrationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "#FAFBFC",
    borderBottomWidth: 1,
    borderColor: "#DFE1E6",
    width: "300@s",
    borderRadius: 10,
  },
  input: {
    fontSize: "14@s",
    width: "156@s",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginBottom: 36,
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },

  buttonContainer: {
    width: "300@s",
  },
  collectorContainer: {
    marginVertical: 15,
  },
  label: {
    color: "#A9A9A9",
    marginBottom: 5,
  },
});
