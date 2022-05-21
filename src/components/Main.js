import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userContext = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__photo">
          <div className="profile__image-wrapper">
            <img
              className="profile__avatar"
              onClick={onEditAvatar}
              src={userContext.avatar}
              alt={userContext.name}
            />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userContext.name}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
                type="button"
              ></button>
            </div>
            <p className="profile__about">{userContext.about}</p>
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
          <Card
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            userContext={userContext}
            card={card}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;