
const getAccessToken= ()=>{
    const currentUser =  JSON.parse(localStorage.getItem("currentUser"))//||"No token found in current user";
    const accessToken=(currentUser?.accessToken);
    // console.log(accessToken);
    return accessToken||"noToken" ;
  }

export default getAccessToken;