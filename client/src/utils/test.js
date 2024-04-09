import axios from "axios";

const getAccessToken= ()=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accessToken = currentUser?.accessToken;
  console.log(accessToken);
  return accessToken || '';
}


const newRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  headers: {
      'Custom-Header': getAccessToken(),
    }

});


export default newRequest;
