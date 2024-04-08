import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:8800/api/",
  baseURL: "https://free-lancer-api.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;
