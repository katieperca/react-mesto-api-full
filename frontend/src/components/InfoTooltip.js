import React from 'react';
import imageError from '../images/fail.svg';
import imageSuccess from '../images/success.svg';

function InfoTooltip(props) {
  const image = props.isRegisterSucceed ? imageSuccess : imageError;
  const message = props.isRegisterSucceed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <section className={`popup popup_type_infotooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="popup__icon" src={image} alt="Статус авторизации" />
        <h2 className="popup__message">{message}</h2>
        <button onClick={props.onClose} className="popup__close-button button button_type_close" type="button" aria-label="Закрыть"></button>
      </div>
    </section>
  )
}

export default InfoTooltip;
