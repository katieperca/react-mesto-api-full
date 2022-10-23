import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn && 'card__delete-button_visible'}`
  );

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`
  );

  function handleCardClick() {
    props.onCardClick({name: props.card.name, link: props.card.link});
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__item card">
      <div className="card__image-container">
        <img onClick={handleCardClick} className="card__image" alt={props.card.name} src={props.card.link} />
      </div>
      <button onClick={handleDeleteClick} aria-label="Удалить" type="button" className={cardDeleteButtonClassName}></button>
      <div className="card__info">
        <h3 className="card__title">{props.card.name}</h3>
        <div className="card__like-container">
          <button onClick={handleLikeClick} aria-label="Поставить лайк" type="button" className={cardLikeButtonClassName}></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
