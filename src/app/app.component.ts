import { Component, OnInit } from '@angular/core';
import socketIOClient from "socket.io-client";

import { environment } from "../environments/environment";
import { GameService } from './services/game.service';
import { GameModel } from './models/game.model';

export const socket = socketIOClient(`${environment.apiURL}/`, {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 

  constructor(
    public gameService: GameService
  ) {}

  ngOnInit() {
    this.gameService.getAllGames();
  }
}
