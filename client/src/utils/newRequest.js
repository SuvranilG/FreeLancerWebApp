import axios from "axios";

const getAccessToken= async ()=>{
  const currentUser = await JSON.parse(localStorage.getItem("currentUser"));
  const accessToken = await currentUser?.accessToken;
  console.log(accessToken);
  return accessToken || '';
}

// const baseURL= "http://localhost:8800/api";

const newRequest = axios.create({
  // baseURL: "http://localhost:8800/api/",
  // baseURL: "https://free-lancer-api.vercel.app/api/",
  baseURL: "https://freelancerwebapp.onrender.com/api/",
  // withCredentials: true,

  // headers: {
  //   'Content-Type': 'application/json',
  //   "X-AccessToken-Header": getAccessToken(),
  // }

  // headers: {
  //   'Authorization': `Bearer ${getAccessToken()}`
  // }

  headers: {
      'Custom-Header': getAccessToken(),
    }

});


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
