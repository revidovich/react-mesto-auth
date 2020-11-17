import React, { useEffect } from 'react';

function ImagePopup({ card, onClose }) { //selectedCard, onClose
  function handleClick() {
    onClose(card);
  }

  useEffect(() => {
    if (document.contains(document.querySelector('.popup_is-opened'))) {
      function handleESCclose(evt) {
        if (evt.key === "Escape") {
          console.log(`нажали`);
          handleClick();
        }
      }
      document.addEventListener("keydown", handleESCclose);
      return () => {
        document.removeEventListener("keydown", handleESCclose);
      };
    }
  });

  useEffect(() => {
    if (document.contains(document.querySelector('.popup_is-opened'))) {
      function handleOverlayClose(evt) {
        if (evt.currentTarget === evt.target) {
          handleClick();
        }
      }
      document.querySelector('.popup_is-opened').addEventListener('click', handleOverlayClose)
    }
  })

  return (
    <section className={`popup ${card.isImgPopupOpen ? 'popup_is-opened' : ''}`}>
      <figure className='zoom'>
        <button className='popup__close popup__close_figure hover-style' type='button'
          aria-label='Закрыть картинку' onClick={handleClick} />
        <img className='zoom__image' src={`${card.link}`} alt={`${card.name}`} />
        <figcaption className='zoom__caption'>{`${card.name}`}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;