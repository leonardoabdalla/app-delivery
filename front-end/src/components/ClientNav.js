import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { readInLocalStorage, saveInLocalStorage } from '../services/localStorage';

function ClientNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    saveInLocalStorage('data', null);
    navigate('/login');
  };

  return (
    <nav>
      <ul className="nav-left">
        <li>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </li>
        <li>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </li>
      </ul>
      <ul className="nav-right">
        <li>
          <span data-testid="customer_products__element-navbar-user-full-name">
            { readInLocalStorage('data').name }
          </span>
        </li>
        <li>
          <button
            type="button"
            onClick={ handleLogout }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default ClientNav;
