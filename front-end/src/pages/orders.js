/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ClientNav from '../components/ClientNav';
import OrderCard from '../components/orderCard';
import requestApi from '../services/ApiService';
import { readInLocalStorage } from '../services/localStorage';
import '../components/orderCard.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const info = readInLocalStorage('user');
      const data = await requestApi('localhost:3001/sales/user', '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: info.email }),
      });
      setOrders(data);
    };
    getData();
  }, []);

  return (
    <>
      <ClientNav />
      <div className="order__element-card">
        { // CONFERIR NOMES DAS CHAVES
          orders.map((order) => (
            <OrderCard
              key={ order.id }
              id={ order.id }
              status={ order.status }
              date={ order.saleDate }
              price={ order.totalPrice }
            />
          ))
        }
      </div>
    </>
  );
}

export default Orders;
