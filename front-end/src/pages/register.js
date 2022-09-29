import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveInLocalStorage } from '../services/localStorage';
import requestApi from '../services/ApiService';

const MIN_PASS_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const validName = name.length >= MIN_NAME_LENGTH;
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= MIN_PASS_LENGTH;
    const buttonEnabled = validEmail && validPassword && validName;
    setDisabled(!buttonEnabled);
  }, [name, email, password]);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const data = await requestApi(
        '/users',
        'POST',
        JSON.stringify({ name, email, password }),
      );
      saveInLocalStorage('user', data);
      navigate('/customer/products');
    } catch (error) {
      console.log(error);
      setMessageError(true);
    }
  }

  return (
    <div>
      <h1>REGISTRO</h1>
      <form>
        <input
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Name"
          type="text"
          value={ name }
          data-testid="common_register__input-name"
        />
        <input
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="E-mail"
          type="email"
          value={ email }
          data-testid="common_register__input-email"
        />
        <input
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Password"
          type="password"
          value={ password }
          data-testid="common_register__input-password"
        />
        <button
          className="btn btn-success btn-block"
          data-testid="common_register__button-register"
          disabled={ disabled }
          onClick={ (e) => handleRegister(e) }
          type="button"
        >
          Cadastrar
        </button>
        {
          messageError && (
            <p
              data-testid="common_register__element-invalid_register"
            >
              Usuário já cadastrado!
            </p>
          )
        }
      </form>
    </div>
  );
}

export default Register;
