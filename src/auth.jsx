import { setToken } from './utils/token';
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email,password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.user){
      setToken(data.jwt);
      return data;
    } else {
      return;
    }
  })
  .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, { //здесь наш токен
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export function tokenCheck () {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return;
  }
  getContent(jwt)
    .then((res) => {
      if (res) {
        const userData = {
          id: res.data._id,
          email: res.data.email
        }
        return userData
      }
    })
    .catch((err) => {
      console.log(`Невалидный токен: ${err}`)
    });
}