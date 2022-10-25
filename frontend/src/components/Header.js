import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
// import menuButton from '../images/mobile-menu-button.svg';
// import menuButtonClose from '../images/mobile-menu-close-button.svg';

function Header(props) {
  return (
    <header className="header">
        <img className="logo__image" src={headerLogo} alt="Логотип Mesto" />
      <Switch>
        <Route exact path="/">
          {/* <button className="header__nav-button" type="button" value="Открыть меню"></button> */}
          <ul className="header__nav">
            <li className="header__nav-item">{props.userEmail}</li>
            <li className="header__nav-item">
              <button className="header__nav-logout" type="button" onClick={props.onSignOut}>Выйти</button>
            </li>
          </ul>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;
