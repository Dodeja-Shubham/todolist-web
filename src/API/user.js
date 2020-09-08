import axios from "axios";
import { BASE_URL } from "../const";

export const signUpAPI = (payload, cb) => {
  axios
    .post(`${BASE_URL}/user/registration/`, payload)
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};

export const logInAPI = (payload, cb) => {
  axios
    .post(`${BASE_URL}/user/login/`, payload)
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};
