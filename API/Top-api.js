import axios from "axios";
import { ROUTE, TOPUP } from "../constants";

export const GETTOKEN = async () => {
  const res = await axios.get(`${ROUTE}/token`).catch((err) => {
    if (err.toJSON().message === "Network Error") {
      return { err: "Network error" };
    } else {
      return { err: "Invalid details" };
    }
  });
  return res;
};

export const GETCOUNTRIES = async (token) => {
  const res = await axios
    .get(`${TOPUP}/countries `, {
      headers: { Authorization: `${token}` },
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const GETOPERATORS = async (token, country) => {
  console.log("loading");
  const res = await axios
    .get(
      `${TOPUP}/operators/countries/${country}?includeBundles=true&includeData=true&includePin=true&includePin=true&suggestedAmounts=true&suggestedAmountsMap=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.log(err));

  return res;
};
