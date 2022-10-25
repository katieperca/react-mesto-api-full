// import logo from './logo.svg';
import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import '../index.css';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterSucceed, setIsRegisterSucceed] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log('Ой, ошибка', err);
      });
    }
  });

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        }).catch((err) => {
          console.log('Ой, ошибка', err);
        });
    }
  }, [loggedIn]);

  function onRegister(email, password) {
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setIsRegisterSucceed(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      }
    }).catch((err) => {
      setIsInfoTooltipOpen(true);
      setIsRegisterSucceed(false);
      console.log('Ой, ошибка', err);
    });
  }

  function onLogIn(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        api.setToken();
        setLoggedIn(true);
        history.push('/');
      }
    }).catch((err) => {
      setIsInfoTooltipOpen(true);
      setIsRegisterSucceed(false);
      console.log('Ой, ошибка', err);
    });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleUpdateUser(user) {
    api.updateUserData(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log('Ой, ошибка', err);
      });
  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log('Ой, ошибка', err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log('Ой, ошибка', err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log('Ой, ошибка', err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id && c);
        setCards(newCards);
      }).catch((err) => {
        console.log('Ой, ошибка', err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={onSignOut}
          userEmail={userEmail}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            loggedIn={loggedIn}
          />
          <Route path='/signup'>
            <Register
              onRegister={onRegister}
            />
          </Route>
          <Route path='/signin'>
            <Login
              history={history}
              onLogIn={onLogIn}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegisterSucceed={isRegisterSucceed}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
