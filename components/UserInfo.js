import {profileTitleNode, profileSubTitleNode, titleInputNode, subInputNode } from '../pages/index.js';

export default class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  };

  getUserInfo() {
    titleInputNode.value = profileTitleNode.textContent;  
    subInputNode.value = profileSubTitleNode.textContent;  
  }

  setUserInfo() {
    profileTitleNode.textContent = this._name.value;
    profileSubTitleNode.textContent = this._description.value;
  }
}