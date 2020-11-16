import React from 'react';
import Regsucs from '../images/union.svg';
import Regerr from '../images/union-error.svg';

function InfoTooltip (props) {

  return (
    <section
        className={`popup ${props.isOpen} ? 'popup_is-opened' : '' `}
    >
    <div className="popup__form">
        <img
          className="popup__union"
          alt="union"
          src={`${ props.isSuccess ? Regsucs : Regerr }`}
        />
        <p className="popup__info" >
          { props.isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </p>
        <button
          className='popup__close popup__close_figure hover-style' type='button'
          onClick={props.onClose}
        />
        </div>
    </section>
  )
}

export default InfoTooltip;
