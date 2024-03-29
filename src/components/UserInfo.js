export class UserInfo {
  constructor({name, about, avatar}) {

    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);

  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar({ userAvatarLink }) {
    this._avatar.src = userAvatarLink;
  }


}
