import Popup from './Popup.js';
import {previewImage, previewTitle} from '../pages/index.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };

  open(name, link) {
    super.open();
    previewImage.src = link; 
    previewImage.alt = name; 
    previewTitle.textContent = name;
  }
}