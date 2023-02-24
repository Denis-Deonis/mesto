export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _handleSendingRequest(res) {
    // (res.ok) ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`) ;

    if(res.ok) {
      return Promise.resolve(res.json())
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }  // Формирую запрос на сервер

  async getUserInfo() {
    const requestUrl = await fetch(`${this._baseUrl}/users/me`,
      {headers: this._headers,} )
    return this._handleSendingRequest(requestUrl)
  } // Метод загрузки информации о пользователе с сервера

  async getInitialCards() {
    const requestUrl = await fetch(`${this._baseUrl}/cards`,
      {headers: this._headers,} )
    return this._handleSendingRequest(requestUrl)
  } // Метод загрузки карточек с сервера

  async editProfile(data) {
    const requestUrl = await fetch(`${this._baseUrl}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.nameInput,
          about: data.jobInput,
        })
      }
    )
    return this._handleSendingRequest(requestUrl)
  } // Метод редактирование профиля

  async addNewCard(data) {
    const requestUrl = await fetch(`${this._baseUrl}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }
    )
    return this._handleSendingRequest(requestUrl)
  } // Метод добавления новой карточки

  async addCardLike(cardId) {
    const requestUrl = await fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    )
    return this._handleSendingRequest(requestUrl)
  } // Метод постановки лайка карточки

  async deleteCardLike(cardId) {
    const requestUrl = await fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
    return this._handleSendingRequest(requestUrl)
  } // Метод удаления лайка карточки

  async removeLike(cardId) {
    const requestUrl = await fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
    return this._handleSendingRequest(requestUrl)
  }

  async updateProfileAvatar(data) {
    const requestUrl = await fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      }
    )
    return this._handleSendingRequest(requestUrl)
  } // Метод обновления аватара пользователя

}
