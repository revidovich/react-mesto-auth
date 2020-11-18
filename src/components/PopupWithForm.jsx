import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {

    return (
      <section className={`popup ${isOpen?'popup_is-opened':''} popup_${name}`}>
        <form className='popup__form'
          action='#'
          noValidate
          onSubmit={onSubmit}>
          <button
            className='popup__close hover-style'
            type='button'
            aria-label='Закрыть окно без сохранения'
            onClick={onClose} />
          <fieldset className='popup__content'>
            <h3 className='popup__title'>{`${title}`}</h3>
            {children}
          </fieldset>
        </form>
      </section>
    )
}

export default PopupWithForm;

// Атрибут children можно не указывать в перечислении пропсов, с ним вся работа происходит по умолчанию.