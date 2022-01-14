import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../screens/dashboard/HomeScreen.jsx";
import CustomDrawer from "../components/CustomDrawer.jsx";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import LoginScreen from "../screens/Authentication/LoginScreen.jsx";
import RegistrationScreen from "../screens/Authentication/RegistrationScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TopUpScreen from "../screens/dashboard/TopUpScreen.jsx";
import FundScreen from "../screens/dashboard/FundScreen.jsx";
import TransactionScreen from "../screens/dashboard/TransactionsScreen.jsx";
import AccountScreen from "../screens/dashboard/profileScreen.jsx";
import SupportScreen from "../screens/dashboard/SupportScreen.jsx";
import CardScreen from "../screens/dashboard/Topup/CardScreen.jsx";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const FundStacks = createStackNavigator();
export const DefaultStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegistrationScreen} name="Registration" />
    </Stack.Navigator>
  );
};

export const FundStack = () => {
  return (
    <FundStacks.Navigator screenOptions={{ headerShown: false }}>
      <FundStacks.Screen component={FundScreen} name="fund" />
      <FundStacks.Screen component={CardScreen} name="card" />
    </FundStacks.Navigator>
  );
};

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -18,
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Top-Up"
        component={TopUpScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="opencart" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Fund Wallet"
        component={FundStack}
        options={{
          drawerIcon: ({ color }) => (
            <Fontisto name="money-symbol" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="history-edu" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="target-account"
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="support-agent" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export const HomeStack = () => {
  const data = useSelector((s) => s);
  const auth = data.AuthReducer;
  console.log(data);
  return (
    <NavigationContainer>
      {auth ? <DrawerStack /> : <DefaultStack />}
    </NavigationContainer>
  );
};
