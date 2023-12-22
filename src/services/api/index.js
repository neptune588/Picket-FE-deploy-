import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
});

const getData = async (...args) => {
  const res = await instance.get(...args);
  return res.json();
};
const postData = async (...args) => {
  const res = await instance.post(...args);
  return res;
};
const putData = async (...args) => {
  const res = await instance.put(...args);
  return res;
};
const delData = async (...args) => {
  const res = await instance.del(...args);
  return res;
};

export { instance, getData, postData, putData, delData };
