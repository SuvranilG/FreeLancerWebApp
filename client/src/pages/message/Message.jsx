import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {React,useEffect,useState} from "react";
import { Link, useParams ,useLocation} from "react-router-dom";
import newRequest from "../../utils/newRequest";
import fetchUserDetailsById from "../../utils/fetchUserDetailsById";
import "./Message.scss";



const Message = () => {

  const location = useLocation();
  const messageData =location.state;
  // console.log(messageData);

  const [userDetails, setUserDetails] = useState([]);  

  useEffect(() => {
  
      [messageData]?.forEach(async (item) => {
      const sellerUserDetails = await fetchUserDetailsById(item.sellerId);
      const buyerUserDetails = await fetchUserDetailsById(item.buyerId);

      setUserDetails((prevUserDetails) => ({ 
        ...prevUserDetails,
        [item.sellerId]: sellerUserDetails,
        [item.buyerId]: buyerUserDetails,
      }));
    }
  );
  }, []);

    // console.log("UserDetails");
    // console.log(userDetails);
    // console.log(messageData);


  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  // console.log(data);

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
          {/* <div>{id}</div> */}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                

                <div className="flex">                  
                  <img
                  // src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  src={(m.userId === currentUser._id ?userDetails[currentUser._id]?.img:userDetails[m.userId]?.img) || "/img/noavatar.jpg"}
                  alt=""
                  />                  
                  <span>{ m.userId === currentUser._id ?`${currentUser.username.length>9?currentUser.username.slice(0,9)+"...":currentUser.username}`:userDetails[m.userId]?.username.length>9?userDetails[m.userId]?.username.slice(0,9)+"...":userDetails[m.userId]?.username}</span>
                </div>


                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
