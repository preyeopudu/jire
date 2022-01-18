import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import numbro from "numbro";
import { FAB, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((s) => s.UserReducer[0]);
  const navigation = useNavigation();
  const n = numbro(user.creditBalance).format({ thousandSeparated: true });

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          elevation: 2,
          backgroundColor: "#fff",
          marginHorizontal: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {item.deliveredAmountCurrencyCode} {item.deliveredAmount}{" "}
            transaction
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.operatorName}</Text>
            <Text style={{ fontSize: 16 }}>Reference {item.transactionId}</Text>
          </View>
          <Text
            style={{
              textAlign: "right",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            {item.transactionDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{ flex: 2, backgroundColor: "#044CAC", flexDirection: "column" }}
      >
        <DrawerHeader title="Dashboard" theme={true} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 38 }}>
            {user.currency} {n}
          </Text>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 12,
              fontSize: 16,
            }}
          >
            Current Balance
          </Text>
        </View>

        <View style={{ width: 150, alignSelf: "center", marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Fund Wallet");
            }}
            activeOpacity={0.6}
          >
            <View
              style={{
                backgroundColor: "#fff",
                paddingVertical: 10,
                borderRadius: 15,
                elevation: 2,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "#044CAC", fontSize: 17 }}
              >
                FUND WALLET
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ flex: 4, backgroundColor: "#fff", flexDirection: "column" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>Recent Top-ups</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Transactions");
            }}
          >
            <Text style={{ fontSize: 18, color: "#044CAC" }}>See All</Text>
          </TouchableOpacity>
        </View>
        {user.transactions.length > 0 ? (
          <View>
            <FlatList
              data={user.transactions.slice(0, 3)}
              renderItem={renderItem}
              keyExtractor={(item) => item.transactionId}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={{ marginTop: 25 }}>
            <MaterialCommunityIcons
              name="gauge-empty"
              size={45}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{ textAlign: "center", fontSize: 13, marginVertical: 10 }}
            >
              Seems you're quite low on transactions
            </Text>
          </View>
        )}

        <FAB
          style={styles.fab}
          icon="cart"
          animated={true}
          onPress={() => {
            navigation.navigate("Top-Up");
          }}
        />
      </View>
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
  fab: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 30,
    bottom: 50,
    backgroundColor: Colors.red800,
  },
});

export default HomeScreen;
