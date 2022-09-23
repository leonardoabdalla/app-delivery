import React, { useEffect, useState } from 'react';
// import './products.css';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';
import ProductCard from '../components/productCard';

function Products() {
  const [productList, setProducts] = useState([]);

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
              product={ product }
              key={ index }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Products;
