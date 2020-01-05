import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameModel } from '../models/game.model';
import { ErrorResponse } from '../models/errorResponse.model';
import { socket } from '../app.component';

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
      this.games.next([...this.games.getValue(), newGame]);
    })
  }

  public games: BehaviorSubject<Array<GameModel>> = new BehaviorSubject([]);

  public getAllGames(): Observable<Object | Error> {
    return this.http.get(`${environment.apiURL}/game/all-games`)
      .pipe(
        tap((response: Array<GameModel>) => {
          this.games.next(response);
          return response;
        })
      )
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
