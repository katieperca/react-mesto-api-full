import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(urlRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='update-avatar'
      title='Обновить аватар'
      buttonTitle='Сохранить'
    >
      <input ref={urlRef} className="form__input" id="avatar" type="url" name="avatar" placeholder="Ссылка на картинку" required />
      <span id="avatar-error" className="form__input-error avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
