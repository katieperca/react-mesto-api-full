import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='add'
      title='Новое место'
      buttonTitle='Сохранить'
    >
      <input onChange={handleChangeName} value={name} className="form__input" id="place-name" type="text" name="place-name" placeholder="Название" minLength="2" maxLength="30" required />
      <span id="place-name-error" className="form__input-error place-name-error"></span>
      <input onChange={handleChangeLink} value={link} className="form__input" id="link" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span id="photo-error" className="form__input-error photo-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
