import React, { useState } from "react";
import { View, Text, TextInput, Image, Keyboard, Alert } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ScaledSheet, scale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { LogIn } from "../../store/actions/index.js";
import { Loading } from "../../components/Loading.jsx";
import { LOGIN, USER } from "../../API/Auth-api.js";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    if (email === undefined || password === undefined) {
      Alert.alert("LOGIN ERROR", "You skipped a field !");
      setLoading(false);
    } else {
      const login = await LOGIN({ email: email, password: password });
      if (!login.data) {
        if (login.err == "Network error") {
          setLoading(false);
          Alert.alert("Unable to connect", "check internet settings");
        } else if (login.err == "Invalid details") {
          setLoading(false);
          Alert.alert("Inavlid details", "invalid mail or password");
        }
        setLoading(false);
      } else if (login.data) {
        setLoading(false);
        const getuser = await USER(login.data.token);
        dispatch(LogIn(getuser.data.user));
      }
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
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
              source={require("../../assets/confirm.png")}
            />
            <View style={styles.formContainer}>
              <View>
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
                style={[styles.signIn, { borderRadius: 30, width: "100%" }]}
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
                    Sign-In
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
                No account?
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigate("Registration");
                  }}
                >
                  <Text style={{ fontSize: scale(12), color: "#42526E" }}>
                    Sign up
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

export default LoginScreen;

const styles = ScaledSheet.create({
  inputContainer: {
    backgroundColor: "#FAFBFC",
    borderBottomWidth: 1,
    borderColor: "#DFE1E6",
    borderRadius: 12,
    elevation: 8,
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
    marginVertical: 12,
  },
  label: {
    color: "#A9A9A9",
    marginBottom: 5,
  },
});
