export class UserInfo {
  constructor(name, about, avatar) {

    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.about.textContent,
      avatar: this.avatar.textContent,
    }
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.textContent = avatar

    if (this._avatar.textContent) {
      this._avatar.src = this._avatar.textContent
      this._avatar.alt = this._name.textContent
    }
  }

}
