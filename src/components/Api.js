const onError = (res)=>{
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Сервер не доступен')
}

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;  
  }

  //запрос карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(onError)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '9b76e223-fcf4-4649-a71c-6a4d1969a300',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar:avatar})
    })
      .then(onError)
  }

  //запрос данных по юзеру с сервера
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

  //изменение данных юзера на сервере
  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '9b76e223-fcf4-4649-a71c-6a4d1969a300',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(onError)
  }

  //добаввление новой карточки на сервер
  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }

  //удаление карточки с сервера
  removeCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(onError)
  }

  //запрос количества лайков карточки ПРОВЕРИТЬ А НУЖНО ЛИ МНЕ ЭТО!!!!
  getLikeNumber() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

  //ставлю лайк
  setLikeOnCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })
    .then(onError)
  }

  //снимаю лайк с карточки
  removeLikeFromCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(onError)
  }

}