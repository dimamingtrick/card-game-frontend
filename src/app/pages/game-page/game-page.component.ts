import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';
import { GameRound } from 'src/app/models/gameRound.model';
import { CardModel } from 'src/app/models/card.model';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameIsStarted: Boolean = false;
  gameIsLoading: Boolean = false;
  game: GameModel = null;
  cards: Array<CardModel | String> = [];
  selectedCards: Array<String> = [];

  constructor(
    private gameService: GameService,
    public modal: MatDialog
  ) { }

  startGame(): void {
    this.gameIsLoading = true;
    this.gameService.startGame().subscribe((game: GameModel) => {
      this.cards = game.cards;
      this.gameIsStarted = true;
      this.gameIsLoading = false;
      this.game = game;
    })
  }

  selectCard(cardId: String): void {
    this.selectedCards.push(cardId);
    this.gameService.selectCard(this.game._id, this.selectedCards).subscribe((gameRound: GameRound) => {
      this.game = gameRound.game;
      
      if (this.game.isCompleted) {
        this.completeGame();
      } else {
        this.cards.forEach((i, index) => {
          const selectedCard = this.game.selectedCards.find((c: CardModel) => c._id === i);
          if (selectedCard) {
            this.cards[index] = selectedCard;
          }
        })
      }
    })
  }

  completeGame(): void {
    this.cards.forEach((i, index) => {
      const selectedCard = this.game.cards.find((c: CardModel) => c._id === i);
      if (selectedCard) {
        this.cards[index] = selectedCard;
      }
    });

    this.modal.open(ModalComponent, {
      width: '250px',
      disableClose: true,
      data: { title: `You ${this.game.status}`, message: "Start another game", refreshGame: this.refreshGame.bind(this) }
    });
  }

  refreshGame(): void {
    this.cards = this.cards.map((item: CardModel): CardModel => {
      item.value = false;
      return item;
    })
    
    setTimeout(() => {
      this.gameIsStarted = false;
      this.game = null;
      this.selectedCards = [];
      this.cards = [];
      this.startGame();
    }, 750)
  }
}
