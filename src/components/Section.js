export default class Section {
  constructor({data, renderer}, container, api) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._containerSelector = container;
    this._container = document.querySelector(this._containerSelector);
    this._api = api;
  }

  //добавление карточки на сервер
  addNewCard(newCard) {
    this._api
    .addCard(newCard)
    .then((data) => this._addItem({name: data.name, link: data.link}))
    .catch(err => console.log(err))
  }

  addItem() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  setItem(element, isArray) { 
    if (isArray) {
      this._container.append(element); 
    } else { 
      this._container.prepend(element); 
    } 
  }
}