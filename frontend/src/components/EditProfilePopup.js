import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='edit'
      title='Редактировать профиль'
      buttonTitle='Сохранить'
    >
      <input onChange={handleChangeName} value={name || ''} className="form__input" id="name" type="text" name="name" minLength="2" maxLength="40" placeholder="Имя" required />
      <span id="name-error" className="form__input-error name-error"></span>
      <input onChange={handleChangeDescription} value={description || ''} className="form__input" id="about" type="text" name="about" minLength="2" maxLength="200" placeholder="Занятие" required />
      <span id="about-error" className="form__input-error about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
