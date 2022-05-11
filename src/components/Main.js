import React, { useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
const [cards, setCards] = React.useState([]);
const [userName, setUserName] = React.useState('');
const [userDescription , setUserDescription ] = React.useState('');
const [userAvatar, setUserAvatar] = React.useState('');

  useEffect(() => {
    api.getProfile()
    .then((userData) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }, []);

  useEffect(() => {
    api.getInitialCards()
    .then((userData) => {
      setCards(userData);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__photo">
          <div className="profile__image-wrapper">
            <img
              className="profile__avatar"
              onClick={onEditAvatar}
              src={userAvatar}
              alt="Жак-Ив кусто"
            />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
                type="button"
              ></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
