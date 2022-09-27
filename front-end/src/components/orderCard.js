import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import formatDate from '../helpers/formatDate';

function OrderCard({ id, status, date, price }) {
  const navigate = useNavigate();

  const dataTestId = {
    id: `customer_orders__element-order-id-${id}`,
    status: `customer_orders__element-delivery-status-${id}`,
    date: `customer_orders__element-order-date-${id}`,
    price: `customer_orders__element-card-price-${id}`,
  };

  return (
    <button
      type="submit"
      onClick={ () => navigate(`/customer/orders/${id}`) }
    >
      <section>
        <span>Pedido</span>
        <span data-testid={ dataTestId.id }>{id}</span>
      </section>
      <section data-testid={ dataTestId.status }>{status}</section>
      <section>
        <span data-testid={ dataTestId.date }>{formatDate(date)}</span>
        <span data-testid={ dataTestId.price }>{price}</span>
      </section>
    </button>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default OrderCard;
