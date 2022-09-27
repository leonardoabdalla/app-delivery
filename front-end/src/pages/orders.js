/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientNav from '../components/ClientNav';
import OrderCard from '../components/orderCard';
import requestApi from '../services/ApiService';
import '../components/orderCard.css';

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await requestApi('/sales');
      setOrders(data);
    };
    getData();
  }, []);

  return (
    <>
      <ClientNav page={ user } />
      <div className="order__element-card">
        {
          orders.map((order) => (
            <OrderCard
              key={ order.id }
              id={ order.id }
              status={ order.status }
              date={ order.saleDate }
              price={ order.totalPrice }
              address={ order.deliveryAddress }
              addressNumber={ order.deliveryNumber }
              user={ user }
            />
          ))
        }
      </div>
    </>
  );
}

Orders.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default Orders;
