import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

const getData = (...args) => {
  const res = instance.get(...args);
  return res.json();
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
