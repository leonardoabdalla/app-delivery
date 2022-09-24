import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/cartCard';
import CartContext from '../context/CartContext';
import requestApi from '../services/ApiService';
import { readInLocalStorage } from '../services/localStorage';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [sellerName, setSellerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = () => {
      const data = readInLocalStorage('user');
      setUser(data);
    };
    getData();
  }, []);

  let total = 0;
  cartItems.forEach((e) => {
    total += e.quantity * e.price;
  });

  const arr = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  const sale = {
    sellerName,
    userEmail: user.email,
    totalPrice: total,
    deliveryAddress,
    deliveryNumber,
    products: cartItems,
  };

  async function handleOrder(e) {
    e.preventDefault();

    const { saleId } = await requestApi('localhost:3001/sales', '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale),
    });
    navigate(`/customer/orders/${saleId}`);
  }

  return (
    <div>
      <h1> Carrinho </h1>
      <div>
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
              cartItems.map((order, index) => (
                <tr key={ index }>
                  <CartCard
                    index={ index }
                    products={ order }
                    total={ total }
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.toFixed(2).replace('.', ',')}`}
        </p>
      </div>
      <div>
        <h1> Detalhes e Endereço para Entrega </h1>
        <form>
          <label htmlFor="seller">
            Vendedor Responsável
            <input
              onChange={ ({ target }) => setSellerName(target.value) }
              id="seller"
              placeholder="Kakaka da Silva"
              type="text"
              value={ sellerName }
              data-testid="customer_checkout__select-seller"
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              placeholder="Rua Lalalala"
              type="text"
              value={ deliveryAddress }
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="address-number">
            Número
            <input
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              id="address-number"
              placeholder="123"
              type="text"
              value={ deliveryNumber }
              data-testid="customer_checkout__input-address-number"
            />
          </label>
          <button
            className="btn btn-success btn-block"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (e) => handleOrder(e) }
            type="submit"
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
