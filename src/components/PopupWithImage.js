import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.img =  this._popup.querySelector('.popup__image');
    this.imgTitle = this.popup.querySelector('.popup__image-title');
  }

  open({link, title}) {
    imgTitle.textContent = title;
    img.src = link;
    img.alt = title;
    super.open();
  }


}
