import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser} ) {
  const currentUser = React.useContext(CurrentUserContext);
  // добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми.
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.// Ирина Мозес: Чтобы значения из currentUser всегда заносились на форму при открытии формы, надо в массив зависимостей добавить зависимость от пропа isOpen. Сейчас хук, который поставляет информацию о пользователе на форму, срабатывает только при изменении currentUser, который указан в зависимостях хука. Но, если, например, удалить всю информацию из полей формы и выйти из неё  по Esc, при следующем входе форма откроется с пустыми полями, потому что useEffect не сработает, так как currentUser не был изменён (не было сабмита).Также лучше не использовать условие при определении значения атрибута name для e.target, так как полей может быть больше двух.  // Лучше применить подход к формам с несколькими полями ввода, который предложен в документации https://ru.reactjs.org/docs/forms.html#handling-multiple-inputs   // Т.е. данные всех полей лучше хранить в одном стейте, в каком-то объекте , а запись в него производить в функции handleChange по имени поля ввода:
  // const target = event.target;
  // const value = target.value;
  // const name = target.name;
  // setValues({...values, { [name]: value }});

  function handleChange(e) {
    e.target.name === 'nameInput'
      ? setName(e.target.value)  //   setValue(e.target.value);
      : setDescription(e.target.value);
  }
  // const [values, setValues] = useState({
  //   name: currentUser.name,
  //   description: currentUser.about
  // });

  // function handleChange(event) {
  // const target = event.target;
  // const value = target.value;
  // const name = target.name;
  // setValues( {...values, [name]: value });
  // }

  function handleSubmit(e) {
    e.preventDefault();      // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
//Поскольку кнопка сабмита есть у всех форм, её элемент лучше задать в общем для всех форм компоненте PopupWithForm (а не в атрибуте children для него). В компонентах форм для PopupWithForm нужно задать ещё один атрибут для надписи на кнопке, например, для формы профиля этот атрибут будет задан в виде: buttonText="Сохранить", а  в компоненте PopupWithForm buttonText использовать как проп.
  return (
    <PopupWithForm
      name='profile-edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input className='popup__input popup__input_name'
          type='text'
          name='nameInput'
          value={name || ''}
          onChange={handleChange}
          placeholder='Имя'
          autoComplete='name'
          required
          minLength='2'
          maxLength='40'
        />
        <span className='popup__error' />
      </label>
      <label className='popup__label'>
        <input
          className='popup__input popup__input_about'
          type='text'
          name='aboutInput'
          value={description || ''}
          onChange={handleChange}
          autoComplete='off'
          placeholder='О себе'
          required
          minLength='2'
          maxLength='200'
        />
        <span className='popup__error' />
      </label>
      <button className='popup__button'
        type='submit'
        aria-label='Сохранить изменения'>Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;