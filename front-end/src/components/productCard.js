import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, index }) {
  const navigate = useNavigate();

  handleAdd = (e) => {
    e.preventDefault();
  };

  handleRm = (e) => {
    e.preventDefault();
  };

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
        onClick={ (e) => handleAdd(e) }
      >
        +
      </button>
      <button
        data-testid={ `customer_products__button-card-rm-item-${index}` }
        type="button"
        onClick={ (e) => handleRm(e) }
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
