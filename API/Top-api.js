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
  const res = await axios
    .get(
      `https://topups.reloadly.com/operators/countries/${country}?includeBundles=true&includeData=true&includePin=true&suggestedAmounts=true&suggestedAmountsMap=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.log(err));

  return res;
};

export const GETOPERATORSID = async (token, operatorId) => {
  const res = await axios
    .get(
      `https://topups.reloadly.com/operators/${operatorId}?suggestedAmounts=true&suggestedAmountsMap=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => console.log(err));
  return res;
};

export const RECHARGE = async (token, body) => {
  const response = await axios
    .post(`https://topups.reloadly.com/topups`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));

  return res;
};
