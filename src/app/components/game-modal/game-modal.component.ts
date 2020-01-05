import { Component, Output, EventEmitter } from '@angular/core';
import { GameModalData } from 'src/app/models/gameModalData.model';

const defaultModalData: GameModalData = {
  title: "",
  message: "",
  firstButtonText: "",
  secondButtonText: "",
  timeout: 0,
  onFirstButtonClick: (): void => { },
  onSecondButtonClick: (): void => { }
};

@Component({
  selector: 'game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent {
  @Output() refreshGameEmitter: EventEmitter<void> = new EventEmitter();
  isOpen: Boolean = false;
  data: GameModalData = defaultModalData;

  constructor() { }

  show(data: GameModalData): void {
    this.data = { ...this.data, ...data };

    setTimeout(() => {
      this.isOpen = true;
    }, this.data.timeout);
  }

  close(): void {
    this.isOpen = false;
    this.data = defaultModalData;
  }

  handleFirstButtonClick(): void {
    this.data.onFirstButtonClick();
    this.close();
  }

  handleSecondButtonClick(): void {
    this.data.onSecondButtonClick();
    this.close();
  }
}
