export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;  
  }

  _onError(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Сервер не доступен')
  }

  //запрос карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._onError)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar:avatar})
    })
      .then(this._onError)
  }

  //запрос данных по юзеру с сервера
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._onError)
  }

  //изменение данных юзера на сервере
  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._onError)
  }

  //добаввление новой карточки на сервер
  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._onError)
  }

  //удаление карточки с сервера
  removeCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._onError)
  }

  //ставлю лайк
  setLikeOnCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._onError)
  }

  //снимаю лайк с карточки
  removeLikeFromCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._onError)
  }

}