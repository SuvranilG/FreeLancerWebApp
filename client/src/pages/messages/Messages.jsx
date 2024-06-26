import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {React,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import fetchUserDetailsById from "../../utils/fetchUserDetailsById";
import "./Messages.scss";
import moment from "moment";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import getAccessToken from "../../utils/getAccessToken";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`,{
        headers: {
        'Authorization': "Bearer "+getAccessToken()
      }
    }).then((res) => {
        
        return res.data;
      }),
  });


  const [userDetails, setUserDetails] = useState([]);  

  useEffect(() => {
  
    data?.forEach(async (item) => {
      const sellerUserDetails = await fetchUserDetailsById(item.sellerId);
      const buyerUserDetails = await fetchUserDetailsById(item.buyerId);

      setUserDetails((prevUserDetails) => ({ 
        ...prevUserDetails,
        [item.sellerId]: sellerUserDetails,
        [item.buyerId]: buyerUserDetails,
      }));
    });
  }, [data]);
  
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`,{},{
        headers: {
        'Authorization': "Bearer "+getAccessToken()
      }
    });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const handleMessageClick= async(c)=>{
    const res = await newRequest.get(`/conversations/single/${c.id}`,{
      headers: {
      'Authorization': "Bearer "+getAccessToken()
    }
  });
    navigate(`/message/${c.id}`, { state: res.data});
  }


  queryClient.invalidateQueries();

  return (
    <div className="messages">
      {isLoading ? (
        <Loading/>
      ) : error ? (
        "No messages available"
        // refetch()
        // window.location.reload()

      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((c) => (
              <tr
              className={
                ((currentUser.isSeller && !c.readBySeller) ||
                (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active" || ""
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? userDetails[c.buyerId]?.username : userDetails[c.sellerId]?.username}</td>

                <td>
                  {/* <Link to={{ pathname:`/message/${c.id}`, state:c}} className="link"> */}
                  <div>
                    {c?.lastMessage?.substring(0, 100)}...
                  </div>                  
                  {/* </Link> */}

                  


                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  <button className="link" onClick={()=>{handleMessageClick(c);handleRead(c.id);}}>
                    Read
                  </button> &nbsp;
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )} 
    </div>
  );
};

export default Messages;
