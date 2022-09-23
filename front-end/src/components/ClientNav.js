import React from 'react';
import './ClientNav.css';
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
      <div className="nav-itens">
        <div>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </div>
        <div>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </div>
      </div>
      <div className="nav-user">
        <div>
          <span data-testid="customer_products__element-navbar-user-full-name">
            { readInLocalStorage('data').name }
          </span>
        </div>
        <div>
          <button
            type="button"
            onClick={ handleLogout }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ClientNav;
