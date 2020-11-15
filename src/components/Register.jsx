import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Logo from './Logo.jsx';
// import * as duckAuth from '../duckAuth.jsx';


const Register = (props) => {
  const [data, setData] = useState( {
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    props.onRegister(data.password, data.email);
    setData({email: '', password: ''});
//     if (password === confirmPassword){
//       duckAuth.register(username, password, email).then((res) => {
//         if(res.statusCode !== 400){
//           setMessage('');
//           history.push('/login');
//         } else {
//           setMessage('Что-то пошло не так!')
//         }
//       });
//     }
// });
    // }
  }

  return(
    <form
      className="authform"
      onSubmit={handleSubmit}
      name="register"
    >
    <h1
      className="authform__title"
    >Регистрация
    </h1>
      <input
        className="authform__input"
        id="email"
        name="email"
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
      />
      <input
        className="authform__input"
        value={data.password}
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
      />
        <button
          type="submit"
          className="authform__button"
        >Зарегистрироваться
        </button>
    <div className="authform__signin">
      <p className="authform__then-link">Уже зарегистрированы?</p>
      <Link to="sign-in" className="authform__then-link hover-style">Войти</Link>
    </div>
    </form>
  )
}

export default Register;
