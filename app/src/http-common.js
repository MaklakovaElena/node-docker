import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.88.216/api",
  headers: {
    "Content-type": "application/json",
    "Authorization" : sessionStorage.getItem('Authorization')
  }
});


