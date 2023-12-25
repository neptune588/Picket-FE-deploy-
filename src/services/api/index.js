import axios from "axios";

const BASE_URL = "/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const getData = (...args) => {
  return instance.get(...args);
};
const postData = (...args) => {
  return instance.post(...args);
};
const putData = (...args) => {
  return instance.put(...args);
};
const delData = (...args) => {
  return instance.del(...args);
};

export { instance, getData, postData, putData, delData };
