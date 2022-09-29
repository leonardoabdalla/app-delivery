import React, { useContext, useEffect, useState } from 'react';
// import './products.css';
import { useNavigate } from 'react-router-dom';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';
import ProductCard from '../components/productCard';
import CartContext from '../context/CartContext';

function Products() {
  const [productList, setProducts] = useState([]);
  const [cartDisabled, setCartDisabled] = useState(true);
  const { totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestApi('/products');
      setProducts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCartDisabled(totalPrice === 0);
  }, [totalPrice]);

  return (
    <div>
      <ClientNav page="customer" />
      <div className="products-list">
        {
          productList.map((product, index) => (
            <ProductCard
              key={ index }
              product={ product }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ cartDisabled }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span>Ver carrinho</span>
        <span data-testid="customer_products__checkout-bottom-value">
          {`${totalPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
    </div>
  );
}

export default Products;
