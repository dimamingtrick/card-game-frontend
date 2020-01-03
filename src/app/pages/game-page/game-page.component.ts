import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';
import { GameRound } from 'src/app/models/gameRound.model';
import { CardModel } from 'src/app/models/card.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }

  gameIsStarted: Boolean = false;
  gameIsLoading: Boolean = false;
  game: GameModel = null;
  cards: Array<CardModel | String> = [];
  selectedCards: Array<String> = [];

  ngOnInit() {

  }

  startGame() {
    this.gameIsLoading = true;
    this.gameService.startGame().subscribe((game: GameModel) => {
      this.cards = game.cards;
      this.gameIsStarted = true;
      this.gameIsLoading = false;
      this.game = game;
    })
  }

  selectCard(event, cardId: String) {
    event.preventDefault();
    this.selectedCards.push(cardId);
    this.gameService.selectCard(this.game._id, this.selectedCards).subscribe((gameRound: GameRound) => {
      this.game = gameRound.game;
      
      if (this.game.isCompleted) {
        this.cards.forEach((i, index) => {
          const selectedCard = this.game.cards.find((c: CardModel) => c._id === i);
          if (selectedCard) {
            this.cards[index] = selectedCard;
          }
        })
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

  refreshGame() {
    this.gameIsStarted = false;
    this.game = null;
    this.selectedCards = [];
    this.startGame();
  }
}
