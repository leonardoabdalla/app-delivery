import React from 'react';
import PropTypes from 'prop-types';

function CartCard({ index, products }) {
  const { name, quantity, price } = products;

  return (
    <>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { price }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { (quantity * price).toFixed(2) }
      </td>
      <td>
        <button
          type="submit"
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
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
