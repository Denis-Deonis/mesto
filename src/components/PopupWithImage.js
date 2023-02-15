import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img =  this._popup.querySelector('.popup__image');
    this._imgTitle = this.popup.querySelector('.popup__image-title');
  }

  open(link, name) {
    this._imgTitle.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open();
  }


}
