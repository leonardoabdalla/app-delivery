import React, { useContext, useEffect, useState } from 'react';
// import './products.css';
import { useNavigate } from 'react-router-dom';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';
import ProductCard from '../components/productCard';
import CartContext from '../context/CartContext';

function Products() {
  const [productList, setProducts] = useState([]);
  const { totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestApi('localhost:3001/products', '');
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ClientNav />
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
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => navigate('/customer/checkout') }
      >
        {`${totalPrice.toFixed(2).replace('.', ',')}`}
      </button>
    </div>
  );
}

export default Products;
