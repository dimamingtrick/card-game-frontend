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
    event.preventDefault();
    
    if (this.disabled || this.card.value) {
      return;
    };
    this.selectCardEmitter.emit(this.card._id);
  }
}
