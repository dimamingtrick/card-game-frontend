import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {

  games: Array<GameModel> = [];
  deletingGames: Array<String> = [];

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.games.subscribe((games: Array<GameModel>) => {
      this.games = games;
    });
  }

  isDeleting(gameId: String) {
    return this.deletingGames.find(i => i === gameId);
  }

  deleteGame(gameId: String) {
    this.deletingGames.push(gameId);
    this.gameService.deleteGame(gameId).subscribe(
      response => {
        console.log(response);
        this.deletingGames.filter(i => i !== gameId);
      }
    );
  }
}
