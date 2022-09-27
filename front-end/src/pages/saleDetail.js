import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartCard from '../components/cartCard';
import ClientNav from '../components/ClientNav';
import formatDate from '../helpers/formatDate';
import requestApi from '../services/ApiService';

function SaleDetail() {
  const { id } = useParams();
  const [sale, setSale] = useState([]);
  const [saller, setSeller] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const findSale = async () => {
      const temp = await requestApi(`localhost:3001/sales/${id}`, '');
      setTotalPrice(temp.totalPrice);
      setSale(temp.products);
      setSeller(temp.seller.name);
      setDate(temp.saleDate);
      setStatus(temp.status);
    };
    findSale();
    console.log(sale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arr = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total',
  ];

  return (
    <div>
      <ClientNav />
      <h1>
        Detalhes do Pedido
      </h1>
      <fieldset>
        <div>
          PEDIDO
          {' '}
          { id }
        </div>
        <div>
          Vendedor
          {' '}
          { saller }
        </div>
        <div>
          data
          {' '}
          { formatDate(date) }
        </div>
        <div>
          status
          {' '}
          { status }
        </div>
        <button type="button">
          Marcar como entregue
        </button>
      </fieldset>
      <table>
        <thead>
          <tr>
            {
              arr.map((e) => (
                <th key={ e }>{ e }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            sale.map((order, index) => (
              <tr key={ index }>
                <CartCard
                  index={ index }
                  products={ order }
                  page="order_details"
                />
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        Total Price
        {' '}
        R$
        { totalPrice }
      </div>
    </div>
  );
}

export default SaleDetail;
