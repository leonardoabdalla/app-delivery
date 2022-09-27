import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

function CartCard({ index, products, page }) {
  const { removeFromCart } = useContext(CartContext);
  const { name, price } = products;
  const qtt = page === 'checkout' ? products.quantity : products.SalesProduct.quantity;

  const dataTestId = {
    itemNumber: `customer_${page}__element-order-table-item-number-${index}`,
    tableName: `customer_${page}__element-order-table-name-${index}`,
    tableQty: `customer_${page}__element-order-table-quantity-${index}`,
    unitPrice: `customer_${page}__element-order-table-unit-price-${index}`,
    subTotal: `customer_${page}__element-order-table-sub-total-${index}`,
    btnRemove: `customer_checkout__element-order-table-remove-${index}`,
  };

  return (
    <>
      <td data-testid={ dataTestId.itemNumber }>
        { index + 1 }
      </td>
      <td data-testid={ dataTestId.tableName }>
        { name }
      </td>
      <td data-testid={ dataTestId.tableQty }>
        { qtt }
      </td>
      <td data-testid={ dataTestId.unitPrice }>
        { price.replace('.', ',') }
      </td>
      <td data-testid={ dataTestId.subTotal }>
        { Number(qtt * price).toFixed(2).replace('.', ',') }
      </td>
      {
        page === 'checkout' && (
          <td data-testid={ dataTestId.btnRemove }>
            <button
              type="submit"
              onClick={ () => removeFromCart(products, qtt) }
            >
              Remover
            </button>
          </td>
        )
      }
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
