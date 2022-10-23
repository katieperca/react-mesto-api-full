import React from 'react';

function ImagePopup(props) {
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    setIsOpened(props.isOpen);
  }, [props.isOpen]);

  if (props.card !== null) {
    return(
      <section className={`popup popup_type_photo ${isOpened ? "popup_opened" : ""}`}>
        <div className="popup__photo-container">
          <img className="popup__image" alt={props.card.name} src={props.card.link} />
          <h3 className="popup__title">{props.card.name}</h3>
          <button onClick={props.onClose} className="popup__close-button button button_type_close" type="button" aria-label="Закрыть"></button>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
