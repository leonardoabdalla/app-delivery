import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MIN_PASS_LENGTH = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= MIN_PASS_LENGTH;
    const buttonEnabled = validEmail && validPassword;
    setDisabled(!buttonEnabled);
  }, [email, password]);

  function handleLogin() {
    localStorage.setItem('mealsToken', '1');
    saveInLocalStorage('mealsToken', 1);
    saveInLocalStorage('cocktailsToken', 1);
    saveInLocalStorage('user', { email });
    history.push('/foods');
  }

  function handleRegister() {
    // Levar para pagina de registro
    history.push('/foods');
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form>
        <input
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="E-mail"
          type="email"
          value={ email }
          data-testid="common_login__input-email"
        />
        <input
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Password"
          type="password"
          value={ password }
          data-testid="common_login__input-password"
        />
        <button
          className="btn btn-success btn-block"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ () => handleLogin() }
          type="button"
        >
          Login
        </button>
        <button
          className="btn btn-success btn-block"
          data-testid="common_login__button-register"
          onClick={ () => handleRegister() }
          type="button"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default Login;
