import React from "react";
import { View, Text, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import DrawerHeader from "../../components/DrawerHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

const TransactionScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((s) => s.UserReducer[0]);

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerHeader title="Transactions" />
      {user.transactions.length > 0 ? (
        <View>
          <FlatList
            data={user.transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.transactionId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
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
});

export default TransactionScreen;
