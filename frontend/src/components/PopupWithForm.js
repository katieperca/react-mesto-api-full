import React from 'react';

function PopupWithForm(props) {
  const classNameToggleOpen = `popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`;

  return(
    <section className={classNameToggleOpen}>
      <div className="popup__container">
        <form onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name} form`}>
          <h2 className="form__title">
            {props.title}
          </h2>
          {props.children}
          <button className="form__save-button form__save-button_type_add button button_type_save" type="submit">{props.buttonTitle}</button>
        </form>
        <button onClick={props.onClose} className="popup__close-button button button_type_close" type="button" aria-label="Закрыть"></button>
      </div>
    </section>
  )
}

export default PopupWithForm;
