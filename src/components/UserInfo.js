export default class UserInfo {
  constructor(name, description, avatar) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar)
  };

  getUserInfo() {
    const currentUserInfo = {
      name: this._name.textContent,
      description: this._description.textContent
    }  
    return currentUserInfo
  }

  setUserInfo(inputName, inputDescription) {
    this._name.textContent = inputName;
    this._description.textContent = inputDescription;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}