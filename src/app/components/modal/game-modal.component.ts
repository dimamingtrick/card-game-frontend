import { Component, Output, EventEmitter } from '@angular/core';
import { GameModalData } from 'src/app/models/gameModalData.model';

const defaultModalData: GameModalData = {
  title: "",
  message: "",
  submitButtonText: "",
  onSubmit: (): void => {}
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
    this.data = data;
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.data = defaultModalData;
  }

  refreshGame(): void {
    this.data.onSubmit();
    this.close();
  }
}
