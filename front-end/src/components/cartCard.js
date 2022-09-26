import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

function CartCard({ index, products }) {
  const { removeFromCart } = useContext(CartContext);
  const { name, quantity, price } = products;

  return (
    <>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { price.replace('.', ',') }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { Number(quantity * price).toFixed(2).replace('.', ',') }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-remove-${index}` }>
        <button
          type="submit"
          onClick={ () => removeFromCart(products, quantity) }
        >
          Remover
        </button>
      </td>
    </>
  );
}

CartCard.propTypes = {
  index: PropTypes.number,
  productName: PropTypes.string,
  quantity: PropTypes.string,
  unitPrice: PropTypes.number,
  subTotal: PropTypes.number,
}.isRequired;

export default CartCard;
