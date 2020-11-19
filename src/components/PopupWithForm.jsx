import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children, buttonText }) {

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
            <button className='popup__button'
              type='submit'
              aria-label='Сохранить изменения'>{buttonText}
            </button>

          </fieldset>

        </form>
      </section>
    )
}

export default PopupWithForm;

// Атрибут children можно не указывать в перечислении пропсов, с ним вся работа происходит по умолчанию.
//Поскольку кнопка сабмита есть у всех форм, её элемент лучше задать в общем для всех форм компоненте PopupWithForm (а не в атрибуте children для него). В компонентах форм для PopupWithForm нужно задать ещё один атрибут для надписи на кнопке, например, для формы профиля этот атрибут будет задан в виде: buttonText="Сохранить", а  в компоненте PopupWithForm buttonText использовать как проп.