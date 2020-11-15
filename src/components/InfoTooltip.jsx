import React from 'react';
import Regsucs from '../images/union.svg';
import Regerr from '../images/union-error.svg';

function InfoTooltip (props) {

  return (
    <InfoTooltip
        isOpen={props.isOpen}
        onClose={props.onClose}
        className={`popup ${props.isOpen
          ? 'popup_is-opened'
          : ''
        }`}
    >
        <img
          className="popup__tooltip"
          alt="union"
          src={`${ props.isSuccess ? Regsucs : Regerr }`}
        />
        <p
          className="popup__info"
        >
          {`${ props.isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
            }`
          }
        </p>
        <button
          onClick={props.onClose}
          className="popup__close-button popup__close-button_up"
          type="button"
        />
    </InfoTooltip>
  )
}

export default InfoTooltip;
