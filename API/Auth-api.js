import axios from "axios";
import { ROUTE } from "../constants";

export const LOGIN = async (details) => {
  const res = await axios.post(`${ROUTE}/login`, details).catch((err) => {
    if (err.toJSON().message === "Network Error") {
      return { err: "Network error" };
    } else {
      return { err: "Invalid details" };
    }
  });
  return res;
};

export const REGISTER = async (details) => {
  const res = await axios.post(`${ROUTE}/signup`, details).catch((err) => {
    if (err.toJSON().message === "Network Error") {
      return { err: "Network error" };
    } else if (err.toJSON().message === "Request failed with status code 401") {
      return { err: "401" };
    }
  });
  return res;
};

export const USER = async (token) => {
  const res = await axios
    .get(`${ROUTE}/user`, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => {
      return { err };
    });
  return res;
};

export const PROFILE = async (token, user) => {
  const res = await axios.put(`${ROUTE}/profile`, user).catch((err) => {
    if (err.toJSON().message === "Network Error") {
      return { err: "Network error" };
    } else if (err.toJSON().message === "Request failed with status code 401") {
      return { err: "401" };
    }
  });
  return res;
};
