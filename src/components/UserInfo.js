export class UserInfo {
  constructor({nameInput, jobInput}) {
    this._userName = document.querySelector(nameInput);
    this._userAbout = document.querySelector(jobInput);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }

}
