import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameModel } from '../models/game.model';
import { ErrorResponse } from '../models/errorResponse.model';
import { socket } from '../app.component';
import { ErrorStateMatcher } from '@angular/material';

export interface TakePriseResponse {
  message: String;
  game: GameModel;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) {
    socket.on("gamesChange", (newGame: GameModel) => {
      this.games.next([newGame, ...this.games.getValue()]);
    })
  }

  public games: BehaviorSubject<Array<GameModel>> = new BehaviorSubject([]);

  public getAllGames(): Subscription {
    return this.http.get(`${environment.apiURL}/game/all-games`).subscribe(
      (response: Array<GameModel>) => {
        this.games.next(response);
        console.log(response)
      }
    );
  }

  public startGame(): Observable<Object | ErrorResponse> {
    return this.http.get(`${environment.apiURL}/game/start-game`);
  }

  public selectCard(gameId: String, cards: Array<String>): Observable<Object | ErrorResponse> {
    return this.http.post(`${environment.apiURL}/game/${gameId}/select-card`, { cards });
  }

  public takePrise(gameId: String): Observable<Object | TakePriseResponse> {
    return this.http.get(`${environment.apiURL}/game/${gameId}/take-prise`);
  }
}
