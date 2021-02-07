import {titleInputNode, subInputNode } from '../pages/index.js';

export default class UserInfo {
  constructor(name, description) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  };

  getUserInfo() {
    titleInputNode.value = this._name.textContent;  
    subInputNode.value = this._description.textContent;  
  }

  setUserInfo() {
    this._name.textContent = titleInputNode.value;
    this._description.textContent = subInputNode.value;
  }
}