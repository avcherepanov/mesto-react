import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardsContext } from '../context/CardsContext'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id))
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  useEffect(() => {
    api.getProfile()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }, [])

  useEffect(() => {
    api.getInitialCards()
    .then((dataCards) => {
      setCards(dataCards);
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }, [])

  function handleUpdateUser(name) {
    api.editProfile(name.name, name.about)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleUpdateAvatar(avatar) {
    api.resetAvatar(avatar.avatar)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleAddPlace(title) {
    api.addCard(title.title, title.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.err(`Ошибка ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        setCards={setCards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlace}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;