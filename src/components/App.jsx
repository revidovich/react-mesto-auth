import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.jsx";
import Login from './Login.jsx';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  // окна
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  // объекты
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState(null)
  const history = useHistory();

// ----------------------------------------------------------------------------------

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialItems()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

// ----------------------------------------------------------------------------------

  function closeAllPopups(card) {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ ...card, isImgPopupOpen: false });     //  не подходит setSelectedCard(false); - оно закрывается не плавно, а сразу скидывает фотку на фолз. мне же надо оставить фотку, но изменить состояние. лучше разделить попап и лайтбокс и написать разную логику закрытия, но я пока не знаю какую. если в юзэффекте нет зависимостей, то фотка закрывается плавно и в нетворке нет движения. Если зависимость есть [], как нам рекомендовал ваш главный ревьюер делать на вебинаре, то закрытие с андефайндом и запрос к серверу, да, спасибо что сказали
  }
  function handleCardClick(card) {
    setSelectedCard({ ...card, isImgPopupOpen: true });
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleUpdateUser({ name, about }) {
    api
      .patchUserData({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
  function handleUpdateAvatar(avatar) {
    //{avatar: 'https://pictures.jpg'}
    api
      .patchUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  //Cards

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postItem({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteItem(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => console.log(err));
  }

  //Auth

  function handleLogin (email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {// tokenCheck();
          setIsSuccess(true) //обязательное поле
          localStorage.setItem('jwt', res.token)
          setEmail(email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log('Не передано одно из полей: ' + err);
        } else if (err === 401) {
          console.log('Неправильные почта или пароль: ' + err);
        }
        console.log(err);
      })
      .finally(() =>{
        setInfoTooltipOpen(true)
        console.log('Стейт isSuccess в логине: ' + isSuccess);
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password) //????//   bb@bb.com
      .then(() => {
        setIsSuccess(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        if (err === 400) {
          console.log('потому что Не передано одно из полей: ' + err);
        } else if (err === 401) {
          console.log('потому что Пользователь с таким email не найден: ' + err);
        }
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() =>{
        setInfoTooltipOpen(true)
        console.log('Стейт isSuccess при регистрации: ' + isSuccess);
      })
  }

  function handleLogOut () {
    setEmail(null);
    setIsSuccess(false)
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail( res.data.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);


// ----------------------------------------------------------------------------------
  return (
    <div className="page">
  <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          email={email}
          onLogOut={handleLogOut}
        />

          <Switch>
              <ProtectedRoute
                  exact path={'/'}
                  loggedIn={loggedIn}
              >
                <Main
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  />
                <Footer />
              </ProtectedRoute>

              <Route path="/sign-up">
                <Register
                onRegister={handleRegister}
                />
              </Route>

              <Route path="/sign-in">
                  <Login
                  onLogin={handleLogin}
                  />
              </Route>

              <Route>
                {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
              </Route>
          </Switch>

              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddPlaceSubmit}
              />
      </div>
  </CurrentUserContext.Provider>
    </div>
  );
}
export default App;