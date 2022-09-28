import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import formatDate from '../helpers/formatDate';

function OrderCard({ id, status, date, price, address, addressNumber, user }) {
  const navigate = useNavigate();

  const dataTestId = {
    id: `${user}_orders__element-order-id-${id}`,
    status: `${user}_orders__element-delivery-status-${id}`,
    date: `${user}_orders__element-order-date-${id}`,
    price: `${user}_orders__element-card-price-${id}`,
    address: `seller_orders__element-card-address-${id}`,
  };

  return (
    <button
      type="submit"
      onClick={ () => navigate(`/${user}/orders/${id}`) }
      className="order-card__element-button"
    >
      <section className="order-card__element-order-id">
        <span>Pedido </span>
        <span data-testid={ dataTestId.id }>{id}</span>
      </section>
      <div className="order-card__element-info">
        <div>
          <section
            className={ `order-card__element-info-status ${status}` }
            data-testid={ dataTestId.status }
          >
            {status}
          </section>
          <section className="order-card__element-info-order">
            <span data-testid={ dataTestId.date }>
              {formatDate(date).replace('.', ',')}
            </span>
            <span data-testid={ dataTestId.price }>
              R$
              {' '}
              {price.replace('.', ',')}
            </span>
          </section>
        </div>
        {
          user === 'seller' && (
            <section
              className="order-card__element-info-address"
              data-testid={ dataTestId.address }
            >
              { `${address}, ${addressNumber}` }
            </section>
          )
        }
      </div>
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
