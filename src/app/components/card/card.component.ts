import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card: CardModel;
  @Input() disabled: Boolean;
  @Output() selectCardEmitter: EventEmitter<String> = new EventEmitter();

  constructor() { }

  selectCard(event: any): void {
    if (this.disabled || this.card.value) {
      return;
    };
    event.preventDefault();
    this.selectCardEmitter.emit(this.card._id);
  }
}
