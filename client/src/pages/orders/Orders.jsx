import {React,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Loading from "../../components/loading/Loading";
import axios from "axios";
import getAccessToken from "../../utils/getAccessToken";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data ,refetch} = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`,{
        headers: {
        'Authorization': "Bearer "+getAccessToken()
      }
    }).then((res) => {
        return res.data ;
      }),
  });



  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`,{
        headers: {
        'Authorization': "Bearer "+getAccessToken()
      }
    });
      navigate(`/message/${res.data.id}`,{state:res.data});
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        },{
          headers: {
          'Authorization': "Bearer "+getAccessToken()
        }
      });
        navigate(`/message/${res.data.id}`,{state:res.data});
      }
    }
  };
  return (
    <div className="orders">
      {
      isLoading ? (
      <Loading/> 
      ) : error ? (
        "No Orders found"      
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
