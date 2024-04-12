import axios from "axios";
import { useState,useEffect } from "react";
// const [accessToken,setAccessToken]=useState();
// const getAccessToken= ()=>{
//   const currentUser =  JSON.parse(localStorage.getItem("currentUser"))//||"No token found in current user";
//   // setAccessToken(currentUser?.accessToken);
//   const accessToken=(currentUser?.accessToken);
//   console.log(accessToken);
//   return accessToken//||"noToken" ;
// }
// useEffect(()=>{console.log(accessToken);},[accessToken]);

const createAxiosInstance =()=>{
  // const token= getAccessToken();
  
  // axios.defaults.headers.common['Authorization'] = `Bearer `+token;
  var instance = axios.create({
    // baseURL: "http://localhost:8800/api/",
  baseURL: "https://freelancerwebappbackendforvercel.vercel.app/api/",
  // baseURL: "https://freelancerwebapp.onrender.com/api/",
  // withCredentials: true,
    authorization:true,
    // timeout: 1000,
  // headers: {
  //   'Content-Type': 'application/json',
  //   "X-AccessToken-Header": getAccessToken(),
  // }

  // headers: {
  //   'Authorization': `Bearer ${token}`
  // }
  
    // headers: {
    //   // 'Custom-Header': token,
    // 'Authorization': `Bearer ${token}`
    // }

  });
  // token?instance:instance.defaults=null;

  // if(token==undefined || token==null){
  //   instance.defaults=null;
  //   return instance;
  // }else{
    
  //   return instance;
  // }

  return instance ;

};

const newRequest = createAxiosInstance();







const apiRequestObject = {
  // baseURL: "http://localhost:8800/api",
  get:async (path, data={})=>{
    const URL=baseURL+path;
    console.log('URL method-> get');

    console.log(URL);
    return await axios.get(URL, {...data, accessToken: getAccessToken()});
  },
  post:async (path, data)=>{
    const URL=baseURL+path;
    console.log('URL method-> post');
    console.log(URL);

    return await axios.post(URL, {...data, accessToken: getAccessToken()});
  },
  put:async (path, data)=>{
    const URL=baseURL+path;
    return await axios.put(URL, {...data, accessToken: getAccessToken()});
  },
  delete: async (path, data)=>{
    const URL=baseURL+path;
    return await axios.delete(URL, {...data, accessToken: getAccessToken()});
  }

}

export default newRequest;
