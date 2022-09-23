import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, index }) {
  const navigate = useNavigate();

  const [quantidy, setQuantidy] = useState(0);

  const add = () => setQuantidy(quantidy + 1);

  const sub = () => setQuantidy(quantidy - 1);

  handleCard = () => {
    navigate('/product');
  };

  const { name, price, urlImage } = product;

  return (
    <div data-testid="product">
      <img
        data-testid={ `customer_products__img-card-bg-image-${index}` }
        src={ urlImage }
        alt={ name }
      />
      <div
        data-testid={ `customer_products__element-card-title-${index}` }
      >
        { name }

      </div>
      <div
        data-testid={ `customer_products__element-card-price-${index}` }
      >
        { price }

      </div>
      <button
        data-testid={ ` customer_products__button-card-add-item-${index}` }
        type="button"
        onClick={ add }
      >
        +
      </button>
      <input
        onChange={ ({ target }) => setQuantidy(target.value) }
        type="number"
        value={ quantidy }
        data-testid={ `customer_products__input-card-quantity-${index}` }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${index}` }
        type="button"
        onClick={ sub }
      >
        -
      </button>

    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
