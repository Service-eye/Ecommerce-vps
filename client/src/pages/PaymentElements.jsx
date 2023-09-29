import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const PaymentElements = () => {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/stripeapi`);
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching Stripe API key:', error);
      }
    };
    getStripeApiKey();
  }, []);

  return (
    <>
      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )} */}
      {
        stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
          </Elements>
        )
      }
    </>
  );
};

export default PaymentElements;
