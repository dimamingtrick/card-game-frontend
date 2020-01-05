import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  games: Array<GameModel> = [];

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.games.subscribe((games: Array<GameModel>) => {
      this.games = games;
    })
  }

}
