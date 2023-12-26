import axios from "axios";

const BASE_URL = "http://52.79.248.192:8080/";

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
