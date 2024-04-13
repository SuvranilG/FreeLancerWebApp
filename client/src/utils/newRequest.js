import axios from "axios";


const createAxiosInstance =()=>{
  var instance = axios.create({
    // baseURL: "http://localhost:8800/api/",
  // baseURL: "https://freelancerwebappbackendforvercel.vercel.app/api/",
  baseURL: "https://freelancerwebapp.onrender.com/api/",
  // withCredentials: true,
    authorization:true,
    // timeout: 1000,

  // headers: {
  //   'Authorization': `Bearer ${token}`
  // } 

  });

  return instance ;

};

const newRequest = createAxiosInstance();
export default newRequest;
