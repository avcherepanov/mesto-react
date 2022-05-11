function Card({ card, onCardClick }) {
    function handleCardClick() {
        onCardClick(card);
    }
  return (
    <div className="element">
      <button className="element__button-element-detele"></button>
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
          <button className="element__heart" type="button"></button>
          <span className="element__heartCounter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
