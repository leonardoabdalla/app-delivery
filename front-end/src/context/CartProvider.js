import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { readInLocalStorage, saveInLocalStorage } from '../services/localStorage';
import CartContext from './CartContext';

const NO_INDEX = -1;

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItems(readInLocalStorage('cart') || []);
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((e) => {
      total += e.quantity * e.price;
    });
    setTotalPrice(total);
  }, [cartItems]);

  // uso: setToCart(produto, quantidade);
  const setToCart = (product, quantity = 0, relative = false) => {
    let result = null;
    const itemIndex = cartItems.findIndex((elem) => elem.id === product.id);
    const item = cartItems[itemIndex];

    const newItem = {
      ...product,
      quantity: (relative && item) ? item.quantity + Number(quantity) : Number(quantity),
    };

    if (newItem.quantity <= 0) {
      result = cartItems.filter((elem) => elem.id !== product.id);
    } else {
      result = [...cartItems];
      const newItemIndex = itemIndex === NO_INDEX ? result.length : itemIndex;
      result.splice(newItemIndex, 1, newItem);
    }

    saveInLocalStorage('cart', result);
    setCartItems(result);
  };

  const addToCart = (product, quantity = 1) => setToCart(product, quantity, true);
  const removeFromCart = (product, quantity = 1) => setToCart(product, -quantity, true);

  const { Provider } = CartContext;

  return (
    <Provider
      value={ {
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        setToCart,
      } }
    >
      { children }
    </Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.instanceOf(PropTypes.object),
}.isRequired;

export default CartProvider;
