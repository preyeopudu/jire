import axios from "axios";
import { ROUTE, TOPUP } from "../constants";

export const FUNDACCOUNT = async (amount,id,currency,token) => {
  const res = await axios
    .post(`${ROUTE}/refill`, card, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(res);
  return res;
};
