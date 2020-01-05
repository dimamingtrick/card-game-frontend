import { Component, ViewChild } from '@angular/core';

import { GameService, TakePriseResponse } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';
import { GameRound } from 'src/app/models/gameRound.model';
import { CardModel } from 'src/app/models/card.model';
import { GameModalComponent } from 'src/app/components/game-modal/game-modal.component';
import { GameStatuses } from 'src/app/models/GameStatuses.model';
import { ErrorResponse } from 'src/app/models/errorResponse.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameIsStarted: Boolean = false;
  gameIsLoading: Boolean = false;
  requestLoading: Boolean = false;
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

        if (this.requestLoading) {
          this.requestLoading = false;
        }

        this.game = game;
      },
      (error: ErrorResponse) => {
        console.log(`Load game error: ${error}`);
        if (this.gameIsLoading) {
          this.gameIsLoading = false;
        }

        if (this.requestLoading) {
          this.requestLoading = false;
        }
      }
    )
  }

  selectCard(cardId: String): void {
    if (this.selectedCards.find((i: String) => i === cardId) || this.requestLoading) {
      return;
    }

    this.requestLoading = true;
    this.gameService.selectCard(this.game._id, [...this.selectedCards, cardId]).subscribe(
      (gameRound: GameRound) => {
        this.selectedCards.push(cardId);
        this.game = gameRound.game;
        this.requestLoading = false;
        
        if (this.game.isCompleted) {
          return this.completeGame();
        }

        this.cards.forEach((i: CardModel) => {
          const selectedCard = this.game.selectedCards.find((c: CardModel) => c._id === cardId);
          if (i._id === cardId && selectedCard) {
            i.value = selectedCard.value;
          }
        });

        if (this.selectedCards.length >= 3) {
          this.gameModal.show({
            title: `Do you want to take your prise ?`,
            message: `You select ${this.game.selectedCards.length} cards. Do you want to select prise or keep playing ?`,
            firstButtonText: `Keep Playing`,
            secondButtonText: `Get Prise`,
            onSecondButtonClick: this.takePrise.bind(this),
          });
        }
      },
      (error: ErrorResponse) => {
        console.log("err", error);
        this.requestLoading = false;
      }
    )
  }

  takePrise(): void {
    this.requestLoading = true;
    this.gameService.takePrise(this.game._id).subscribe(
      (response: TakePriseResponse) => {
        this.requestLoading = false;
        this.game = response.game;
        this.completeGame();
      },
      (error) => {
        console.log("takePrise() error", error);
        this.requestLoading = false;
      }
    );
  }

  completeGame(): void {
    const gameStatus: GameStatuses = this.game.status;
    if (gameStatus === "lost") {
      this.cards.forEach((i: CardModel) => {
        const selectedCard = this.game.cards.find((c: CardModel) => c._id === i._id);
        if (selectedCard && !i.value) {
          i.value = selectedCard.value;
        }
      });
  
      this.gameModal.show({
        title: `You ${this.game.status}`,
        message: "Start another game",
        firstButtonText: "Start new game",
        secondButtonText: "Close",
        onFirstButtonClick: this.refreshGame.bind(this),
        timeout: 1000
      });
    } else if (gameStatus === "win") {
      const gameIsFullyCompleted = this.selectedCards.length === 5;

      if (gameIsFullyCompleted) {
        this.cards.forEach((i: CardModel) => {
          const selectedCard = this.game.cards.find((c: CardModel) => c._id === i._id);
          if (selectedCard && !i.value) {
            i.value = selectedCard.value;
          }
        });
      }

      this.gameModal.show({
        title: `Congratulations!`,
        message: `You win the game by selecting ${gameIsFullyCompleted ? "all" : this.game.selectedCards.length} cards`,
        firstButtonText: "Start new game",
        secondButtonText: "Close",
        onFirstButtonClick: this.refreshGame.bind(this),
        timeout: gameIsFullyCompleted ? 1000 : 0
      });
    }
  }

  refreshGame(): void {
    this.cards.forEach((item: CardModel) => {
      item.value = false;
    });

    setTimeout(() => {
      this.selectedCards = [];
      this.requestLoading = true;
      this.loadGame();
    }, 750);
  }
}
