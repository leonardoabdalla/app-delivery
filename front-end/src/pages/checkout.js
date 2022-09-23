import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/cartCard';
import CartContext from '../context/CartContext';
import requestApi from '../services/ApiService';
import { readInLocalStorage } from '../services/localStorage';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [copyCartItems, setCopyCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellerName, setSellerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = () => {
      const data = readInLocalStorage('data');
      setUser(data);
    };
    getData();
  }, []);

  useEffect(() => {
    let total = 0;
    const attCartItems = () => {
      cartItems.forEach((e) => {
        total += e.quantity * e.price;
      });
      setCopyCartItems(cartItems);
    };
    attCartItems();
    setTotalPrice(total);
  }, [cartItems]);

  const arr = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  // ignorar (constantes de teste)
  // const list = [
  //   { productId: 4, name: 'sasa', quantity: 1, unitPrice: 2, subTotal: 2 },
  //   { productId: 5, name: 'sdsdsda', quantity: 2, unitPrice: 3, subTotal: 6 },
  //   { productId: 8, name: 'stytytyt', quantity: 3, unitPrice: 4, subTotal: 12 },
  // ];

  const sale = {
    sellerName,
    userEmail: user.email, // localStorage
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    products: copyCartItems,
  };

  async function handleOrder(e) {
    e.preventDefault();

    const data = await requestApi('localhost:3001/sales', '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify(sale),
    });
    navigate(`/customer/orders/${data.saleId}`);
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
              copyCartItems.map((order, index) => (
                <tr key={ index }>
                  <CartCard
                    index={ index }
                    products={ order }
                    total={ totalPrice }
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${totalPrice.toFixed(2)}`}
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
