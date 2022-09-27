import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';

function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, setToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getCart = () => {
      const prod = cartItems.find((e) => e.id === product.id);
      setQuantity(prod ? prod.quantity : 0);
    };
    getCart();
  }, []);

  const add = () => {
    setQuantity(quantity + 1);
    addToCart(product);
  };

  const sub = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeFromCart(product);
    }
  };

  const handleInput = ({ target }) => {
    const value = Number.isNaN(Number(target.value)) ? 0 : target.value;
    setQuantity(value);
    setToCart(product, value);
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
        onChange={ handleInput }
        type="number"
        min="0"
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
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
