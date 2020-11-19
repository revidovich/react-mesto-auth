import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value /* Значение инпута, полученное с помощью рефа */
    });
  }

  return (
    <PopupWithForm
      name='update-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input
          className='popup__input popup__input_update-avatar'
          ref={inputRef}
          name='linkInput'
          defaultValue=''
          placeholder='Ссылка на фото'
          type='url'
        />
        <span className='popup__error'
        />
      </label>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;