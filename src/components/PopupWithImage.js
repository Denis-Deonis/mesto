import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img =  this._popup.querySelector('.element__image');
    this._imgTitle = this.popup.querySelector('.element__title');
  }

  open({value}) {
    this._imgTitle.textContent = value.name;
    this._img.src = value.link;
    this._img.alt = value.name;
    super.open();
  }


}
