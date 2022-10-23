import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content container">
      <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
          <img alt="Аватар" className="profile__avatar avatar" src={currentUser.avatar} />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} aria-label="Редактировать профиль" type="button" className="profile__edit-button button button_type_edit"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} aria-label="Добавить фото" type="button" className="profile__add-button button button_type_add"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          { props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
