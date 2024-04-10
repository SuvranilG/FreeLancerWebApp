import {React,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Loading from "../../components/loading/Loading";

const Orders = () => {
  const[reload,setReload]=useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, error, data ,refetch} = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }).catch((err) => {window.location.reload()}),
  });

  useEffect(()=>{
    // queryClient.removeQueries();
    // refetch();
    // this.forceUpdate();
    // window.location.reload() //causes infinite loop
    

  },[]);

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`,{state:res.data});
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`,{state:res.data});
      }
    }
  };
  // queryClient.invalidateQueries();
  return (
    <div className="orders">
      {
      isLoading ? (
      <Loading/> 
      ) : error ? (
        "No Orders found"
        // setReload(reload+1)
        // window.location.reload()          
        
        
      ) : ( 
      <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
          <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>Rs.{order.price}</td>
                <td>
                  <div onClick={() => handleContact(order)}>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""                      
                      />
                    </div >
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
  
  )

}
    </div>
  );
};

export default Orders;
