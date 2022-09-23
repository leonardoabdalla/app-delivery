import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { readInLocalStorage, saveInLocalStorage } from '../services/localStorage';
import CartContext from './CartContext';

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

  const addToCart = (product, quantity = 1) => {
    let result = null;
    const itemIndex = cartItems.findIndex((elem) => elem.id === product.id);
    const item = cartItems[itemIndex];

    if (!item) {
      result = [...cartItems, { ...product, quantity }];
    } else {
      result = [
        ...cartItems.slice(0, itemIndex),
        { ...item, quantity: item.quantity + quantity },
        ...cartItems.slice(itemIndex + 1),
      ];
    }

    saveInLocalStorage('cart', result);
    setCartItems(result);
  };

  const removeFromCart = (id, quantity = 1) => {
    let result = null;
    const itemIndex = cartItems.findIndex((elem) => elem.id === id);
    const item = cartItems[itemIndex];

    if (item.quantity <= quantity) {
      result = cartItems.filter((elem) => elem.id !== id);
    } else {
      result = [
        ...cartItems.slice(0, itemIndex),
        { ...item, quantity: item.quantity - quantity },
        ...cartItems.slice(itemIndex + 1),
      ];
    }

    saveInLocalStorage('cart', result);
    setCartItems(result);
  };

  const { Provider } = CartContext;

  return (
    <Provider
      value={ {
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
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
