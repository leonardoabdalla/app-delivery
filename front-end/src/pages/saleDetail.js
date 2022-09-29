import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CartCard from '../components/cartCard';
import formatDate from '../helpers/formatDate';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';

function SaleDetail({ user }) {
  const { id } = useParams();
  const [sale, setSale] = useState([]);
  const [seller, setSeller] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const findSale = async () => {
      const temp = await requestApi(`/sales/${id}`);
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

  const updateStatus = async (newStatus) => {
    await requestApi(`/sales/${id}`, 'PUT', JSON.stringify({ status: newStatus }));
    setStatus(newStatus);
  };

  const arr = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total',
  ];

  const statusId = `${user}_order_details__element-order-details-label-delivery-status`;
  const sallerDT = `${user}_order_details__element-order-details-label-seller-name`;

  return (
    <div>
      <ClientNav page={ user } />
      <h1>
        Detalhes do Pedido
      </h1>
      <fieldset>
        <div
          data-testid={ `${user}_order_details__element-order-details-label-order-id` }
        >
          PEDIDO
          {' '}
          { id }
        </div>
        { user === 'customer' && (
          <div
            data-testid={ sallerDT }
          >
            Vendedor
            {' '}
            { seller }
          </div>
        ) }
        <div
          data-testid={ `${user}_order_details__element-order-details-label-order-date` }

        >
          data
          {' '}
          { formatDate(date) }
        </div>
        <div
          data-testid={ statusId }
        >
          status
          {' '}
          { status }
        </div>
        {
          user === 'customer'
            ? (
              <button
                type="button"
                data-testid={ `${user}_order_details__button-delivery-check` }
                disabled={ status !== 'Em Trânsito' }
                onClick={ () => updateStatus('Entregue') }
              >
                Marcar como entregue
              </button>
            )
            : (
              <>
                <button
                  type="button"
                  data-testid="seller_order_details__button-preparing-check"
                  disabled={ status !== 'Pendente' }
                  onClick={ () => updateStatus('Preparando') }
                >
                  Preparar pedido
                </button>
                <button
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                  disabled={ status !== 'Preparando' }
                  onClick={ () => updateStatus('Em Trânsito') }
                >
                  Saiu para entrega
                </button>
              </>
            )
        }
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
                  user={ `${user}` }
                />
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <span>
          {'Total: R$ '}
        </span>
        <span
          data-testid={ `${user}_order_details__element-order-total-price` }
        >
          { String(totalPrice).replace('.', ',') }
        </span>
      </div>
    </div>
  );
}

SaleDetail.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default SaleDetail;
