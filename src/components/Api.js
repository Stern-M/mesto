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

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(onError)
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onError)
  }

  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }

  removeCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(onError)
  }
}