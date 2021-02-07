export default class Section {
  constructor({data, renderer}, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._containerSelector = container;
    this._container = document.querySelector(this._containerSelector);
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