export default class UserInfo {
  constructor(name, description) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  };

  getUserInfo() {
    const CurrentUserInfo = {
      name: this._name.textContent,
      description: this._description.textContent
    } 
    console.log(CurrentUserInfo) 
    return CurrentUserInfo
  }

  setUserInfo(inputName, inputDescription) {
    this._name.textContent = inputName.value;
    this._description.textContent = inputDescription.value;
  }
}