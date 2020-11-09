import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Redirect, Route, Switch } from "react-router-dom";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.jsx";
import Login from './Login.jsx';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  const [loggedIn, setLoggedIn] = useState(true); //поменять потом в конце true на false!
  // const [userData, setUserData] = useState({ username: '', email: ''});
  // const history = useHistory();

  const handleLogin = (userData) => {
    // setUserData(userData);
    setLoggedIn(true);
  }

  useEffect(() => {
    function handleESCclose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", handleESCclose);
    return () => {
      document.removeEventListener("keydown", handleESCclose);
    };
  }, []);

  // useEffect(() => {
  //   function handleOverlayClose(evt) {
  //     if (evt.currentTarget !== evt.target) {
  //       closeAllPopups();
  //     }
  //   }
  //   document.querySelector('.popup_is-opened').addEventListener('click', handleOverlayClose);
  // }, [])

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
  function closeAllPopups(card) {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ ...card, isImgPopupOpen: false });
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

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>

          <Switch>
              <Header />
              <ProtectedRoute exact path="/" loggedIn={loggedIn}
              >
                <Main
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
              <Route path="/sign-up">
                <Register />
              </Route>
              <Route path="/sign-in">
                <section className="popup">
                  <Login handleLogin={handleLogin} />
                </section>
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
          </Switch>

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
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
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
export default App;
// 1. Создайте нужные роуты и опишите перенаправления
// Вся функциональность вашего приложения будет доступна только авторизованным пользователям. Поэтому реализуйте два дополнительных роута:
// /sign-up — для регистрации пользователя;
// /sign-in — для авторизации пользователя.
// Если неавторизованный пользователь приходит на сайт, он должен попадать на страницу входа, на какой бы роут он не пришёл. ProtectedRoute
