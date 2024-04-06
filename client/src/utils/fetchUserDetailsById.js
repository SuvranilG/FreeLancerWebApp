import newRequest from "./newRequest";
const fetchUserDetailsById= async(id)=>{  
   
    try {
      const res = await newRequest.get(`/users/${id}`);
      const  userDetails  = res.data;
      return userDetails;
    } catch (error) {
      console.error('Error fetching username:', error);
      return ''; // Return a default value or handle the error appropriately
    }
  }

  export default fetchUserDetailsById;