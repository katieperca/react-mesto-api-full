import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onRegister(email, password);
  }

  return(
    <section className="login auth">
        <form onSubmit={handleSubmit} className="auth__form">
          <h2 className="auth__title">
            Регистрация
          </h2>
          <input onChange={handleChange} className="auth__input" id="email" type="text" name="email" placeholder="Email" value={email} required />
          <input onChange={handleChange} className="auth__input" id="password" type="password" name="password" placeholder="Пароль" value={password} required />
          <button className="auth__save-button" type="submit">Зарегистрироваться</button>
        </form>
        <Link to="/signin" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
    </section>
  )
}

export default Register;

