import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {React,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import axios from "axios";


const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        
        return res.data;
      }),
  });
  const [names, setNames] = useState({});
  const fetchNameById= async(id)=>{  
    //This is returning undefined
    // axios.get(`http://localhost:8800/api/users/${id}`).then((res) => {return res.data.username}).catch((err) => {console.log(err)});
    try {
      const res = await newRequest.get(`/users/${id}`);
      return res.data.username;
    } catch (error) {
      console.error('Error fetching username:', error);
      return ''; // Return a default value or handle the error appropriately
    }
  }

  useEffect(() => {
  
    data?.forEach(async (item) => {
      const sellerName = await fetchNameById(item.sellerId);
      const buyerName = await fetchNameById(item.buyerId);

      setNames((prevNames) => ({
        ...prevNames,
        [item.sellerId]: sellerName,
        [item.buyerId]: buyerName,
      }));
    });
  }, [data]);
  

  // console.log(fetchNameById('660e59c4db80c1970a0d2aae'));

  console.log("names");
  console.log(names);
  console.log(data);
  // console.log(currentUser);
  // data?.map((c)=> console.log(c))
  // const [updatedData,setUpdatedData]=useState([]);  
  // data?.map((c)=> (updatedData.push({...c,buyerName:getNameFromId(c.buyerId),sellerName:getNameFromId(c.sellerId)})));
  // updatedData?.map((c)=> console.log(c))
    




  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const handleMessageClick= async(c)=>{
    const res = await newRequest.get(`/conversations/single/${c.id}`);
    navigate(`/message/${c.id}`, { state: res.data});
  }



  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
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
              {data.map((c) => (
              <tr
              className={
                ((currentUser.isSeller && !c.readBySeller) ||
                (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? names[c.buyerId] : names[c.sellerId]}</td>

                <td>
                  <Link to={{ pathname:`/message/${c.id}`, state:c}} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>

                  <button className="link" onClick={()=>handleMessageClick(c)}>
                    Read
                  </button>


                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
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
