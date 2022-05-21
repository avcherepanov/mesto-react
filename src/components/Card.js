import React from "react";

function Card({ onCardDelete, onCardLike, card, onCardClick, userContext }) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  const isOwn = card.owner._id === userContext._id;
  const cardDeleteButtonClassName = `element__button-element-detele ${
    isOwn ? "element__button-element-detele_visible" : "element__button-element-detele-hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === userContext._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : "element__heart"
  }`;

  return (
    <div className="element">
      <button onClick={handleCardDelete} className={cardDeleteButtonClassName}></button>
      <img
        className="element__image"
        alt={card.name}
        src={card.link}
        width="100%"
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__info-caption">{card.name}</h2>
        <div className="element__heartContainer">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <span className="element__heartCounter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;