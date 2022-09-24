import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import CartContext from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  const add = () => {
    setQuantity(quantity + 1);
    addToCart(product);
  };

  const sub = () => {
    setQuantity(quantity - 1);
    removeFromCart(product.id);
  };

  const { name, price, urlImage } = product;

  return (
    <div className="product" data-testid="product">
      <div
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        { price.replace('.', ',') }

      </div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ urlImage }
        alt={ name }
        width="50"
      />
      <div
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        { name }

      </div>
      <button
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ sub }
      >
        -
      </button>
      <input
        onChange={ ({ target }) => setQuantity(target.value) }
        type="number"
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />
      <button
        data-testid={ ` customer_products__button-card-add-item-${product.id}` }
        type="button"
        onClick={ add }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
