import React, { useEffect, useState } from 'react';
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
      <div>
        {
          productList.map((index, producto) => (
            <ProductCard
              product={ producto }
              key={ index }
              index
            />
          ))
        }
      </div>
    </div>
  );
}

export default Products;
