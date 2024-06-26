import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import getAccessToken from "../../utils/getAccessToken";

const stripePromise = loadStripe(
  // "paste public key here"
  "pk_test_51P26bQSJYveYF2uBsMhAHPSrvXjF1PehqfohZmOzVfeIzw5w53RIATvvJRlM7FsEwMpm7lKhTwxfPEkHZLqCZyJU00zyRlrHpK"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`,{data:"data"},{
            headers: {
            'Authorization': "Bearer "+getAccessToken()
          }
        }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
