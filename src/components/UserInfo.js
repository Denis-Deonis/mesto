export class UserInfo {
  constructor(name, about, avatar) {

    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);

    this._data = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.textContent,
    }
  }


  // getUserInfo() {
  //     return {
  //       name:  this._name.textContent,
  //       about: this._about.textContent,
  //       avatar: this._avatar.textContent,
  //     }
  // }

  // getUserInfo({name, about, avatar}) {
  //   this._name.textContent = name;
  //   this._about.textContent = about;
  //   this._avatar.src = avatar;
  // }



  getUserInfo() {
    return {
      name: this._data.name,
      about: this._data.about,
      avatar: this._data.avatar,
    }
  }



  setUserInfo(data) {
    this._data.name = data.name
    this._data.about = data.about
    this._data.avatar = data.avatar
    if (data.name) {
      this._name.textContent = this._data.name
    }

    if (data.about) {
      this._about.textContent = this._data.about
    }

    if (data.avatar) {
      this._avatar.src = this._data.avatar
      this._avatar.alt = this._data.name
    }
  }

}
