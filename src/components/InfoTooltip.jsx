import React from 'react';
import Regsucs from '../images/union.svg';
import Regerr from '../images/union-error.svg';

function InfoTooltip (props) {

          //
  return (
    <section
        className={`popup popup_tooltip`}
  // ${props.isOpen
  //   ? 'popup_is-opened'
  //   : ''
  // }`
    >
    <div>
        <img
          className=""
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
          onClick={props.onClose}
          className="popup__close-button popup__close-button_up"
          type="button"
        />
        </div>
    </section>
  )
}

export default InfoTooltip;
