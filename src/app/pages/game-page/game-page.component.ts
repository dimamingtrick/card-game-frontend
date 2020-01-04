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
  cards: Array<CardModel> = [];
  selectedCards: Array<String> = [];

  constructor(
    private gameService: GameService,
    public modal: MatDialog
  ) { }

  startGame() {
    this.gameIsLoading = true;
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.startGame().subscribe((game: GameModel) => {
      this.cards = game.cards;
      if (!this.gameIsStarted) {
        this.gameIsStarted = true;
      }
      
      if (this.gameIsLoading) {
        this.gameIsLoading = false;
      }
      
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
        this.cards.forEach((i: CardModel) => {
          const selectedCard = this.game.selectedCards.find((c: CardModel) => c._id === cardId);
          if (i._id === cardId && selectedCard) {
            i.value = selectedCard.value;
          }
        })
      }
    })
  }

  completeGame(): void {
    this.cards.forEach((i: CardModel) => {
      const selectedCard = this.game.cards.find((c: CardModel) => c._id === i._id);
      if (selectedCard && !i.value) {
        i.value = selectedCard.value;
      }
    });

    setTimeout(() => {
      this.modal.open(ModalComponent, {
        width: '350px',
        disableClose: true,
        data: { title: `You ${this.game.status}`, message: "Start another game", refreshGame: this.refreshGame.bind(this) }
      });
    }, 1000)
  }

  refreshGame(): void {
    this.cards.forEach((item: CardModel) => {
      item.value = false;
    })
    
    setTimeout(() => {
      this.selectedCards = [];
      this.loadGame();
    }, 750)
  }
}
