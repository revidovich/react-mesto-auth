import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

function Header(props) {
  return (
      <header className='header'>
        <img className='header__logo hover-style'
          src={logo} alt='логотип Mesto Russia' />
        <nav className='header__burger'>

          <Route path="/sign-up">
            <Link to="./sign-in" className="header__exit hover-style">
              Войти
            </Link>
          </Route>

          <Route path="/sign-in">
            <Link to="./sign-up" className="header__exit hover-style">
              Регистрация
            </Link>
          </Route>

          <Route exact path="/">
            <p className='header__email hover-style'
            >
              {props.email}
            </p>
            <Link
            to="./sign-in"
            className='header__exit header__exit_grey hover-style'
            onClick={props.onLogOut} >
              Выйти
            </Link>
          </Route>
        </nav>
      </header>
  );
}

export default Header;

