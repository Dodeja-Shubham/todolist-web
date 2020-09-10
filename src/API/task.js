import axios from "axios";
import { BASE_URL } from "../const";

export const getTasks = (payload, cb) => {
  axios
    .get(`${BASE_URL}/todo/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("xxkeyxx")}`,
      },
    })
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};

export const addTask = (payload, cb) => {
  axios
    .post(`${BASE_URL}/todo/`, payload, {
      headers: {
        Authorization: `Token ${localStorage.getItem("xxkeyxx")}`,
      },
    })
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};

export const updateTask = (payload, cb) => {
  axios
    .patch(`${BASE_URL}/todo/${payload.id}`, payload, {
      headers: {
        Authorization: `Token ${localStorage.getItem("xxkeyxx")}`,
      },
    })
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};
