import axios from "axios";
import Cookies from 'js-cookie';

const newRequest = axios.create({
  // baseURL: "http://localhost:8800/api/",
  // baseURL: "https://free-lancer-api.vercel.app/api/",
  baseURL: "https://freelancerwebapp.onrender.com/api/",
  withCredentials: true,
  // headers: {
  //   'X-AccessToken': Cookies.get('accessToken')
  // }

});

export default newRequest;
