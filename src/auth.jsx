// import { setToken } from './utils/token';
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email,password})
  })
  .then((response) => {
    if (!response.ok) {
      if (response.status ===400){
        return Promise.reject({
          status: response.status,
          message: "некорректно заполнено поле"
        })
        // return Promise.reject({
        //   status: response.status,
        //   message: response.statusText
        // })
      }
    }
    return response.json();
  })
  // .then((res) => {
  //   return res;
  // })
  // .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error${res.status}`);
  })
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error${res.status}`);
  })
}
