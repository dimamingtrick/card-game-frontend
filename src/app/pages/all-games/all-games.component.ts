import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit() {
    
  }

}
