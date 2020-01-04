import { Component, ViewChild } from '@angular/core';

import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';
import { GameRound } from 'src/app/models/gameRound.model';
import { CardModel } from 'src/app/models/card.model';
import { GameModalComponent } from 'src/app/components/modal/game-modal.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameIsStarted: Boolean = false;
  gameIsLoading: Boolean = false;
  gameIsReloading: Boolean = false;
  game: GameModel = null;
  cards: Array<CardModel> = [];
  selectedCards: Array<String> = [];

  @ViewChild(GameModalComponent, { static: false }) gameModal: GameModalComponent;

  constructor(
    private gameService: GameService
  ) { }

  startGame() {
    this.gameIsLoading = true;
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.startGame().subscribe(
      (game: GameModel) => {
        this.cards = game.cards;

        if (!this.gameIsStarted) {
          this.gameIsStarted = true;
        }

        if (this.gameIsLoading) {
          this.gameIsLoading = false;
        }

        if (this.gameIsReloading) {
          this.gameIsReloading = false;
        }

        this.game = game;
      },
      (error: ErrorResponse) => {
        console.log(`Load game error: ${error}`);
      }
    )
  }

  selectCard(cardId: String): void {
    if (this.selectedCards.find((i: String) => i === cardId) || this.gameIsReloading) {
      return;
    }

    this.gameService.selectCard(this.game._id, [...this.selectedCards, cardId]).subscribe(
      (gameRound: GameRound) => {
        this.selectedCards.push(cardId);
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
      },
      (error: ErrorResponse) => {
        console.log("err", error);
      }
    )
  }

  completeGame(): void {
    this.cards.forEach((i: CardModel) => {
      const selectedCard = this.game.cards.find((c: CardModel) => c._id === i._id);
      if (selectedCard && !i.value) {
        i.value = selectedCard.value;
      }
    });

    setTimeout(() => {
      this.gameModal.show({
        title: `You ${this.game.status}`,
        message: "Start another game",
        submitButtonText: "Refresh Game",
        onSubmit: this.refreshGame.bind(this),
      });
    }, 1000)
  }

  refreshGame(): void {
    this.cards.forEach((item: CardModel) => {
      item.value = false;
    })

    setTimeout(() => {
      this.selectedCards = [];
      this.gameIsReloading = true;
      this.loadGame();
    }, 750)
  }
}
