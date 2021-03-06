import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const userContext = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }
  useEffect(() => {
    setName(userContext.name);
    setDescription(userContext.about);
  }, [userContext, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      button="Сохранить"
      onSubmit={handleSubmit}
      children={
        <>
          <input
            autoFocus
            className="popup__input popup__input-name"
            name="username"
            placeholder="Введите имя"
            type="text"
            minLength="2"
            maxLength="40"
            required
            id="name-input"
            onChange={handleChangeName}
            value={name || ""}
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            className="popup__input popup__input-about"
            placeholder="Введите вашу профессию"
            name="about"
            type="text"
            minLength="2"
            maxLength="200"
            required
            id="job-input"
            onChange={handleChangeDescription}
            value={description || ""}
          />
          <span className="popup__input-error job-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;