import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameModel } from '../models/game.model';
import { ErrorResponse } from '../models/errorResponse.model';
import { SocketService } from './socket.service';

export interface TakePriseResponse {
  message: String;
  game: GameModel;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {
    this.socketService.socket.on("gamesChange", (newGame: GameModel) => {
      this.games.next([newGame, ...this.games.getValue()]);
    });

    this.socketService.socket.on("gameWasDeleted", (gameId: String) => {
      this.games.next([...this.games.getValue().filter(i => i._id !== gameId)]);
    });
  }

  public games: BehaviorSubject<Array<GameModel>> = new BehaviorSubject([]);

  public getAllGames(): Subscription {
    return this.http.get(`${environment.apiURL}/game/all-games`).subscribe(
      (response: Array<GameModel>) => {
        this.games.next(response);
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

  public deleteGame(gameId: String) {
    return this.http.delete(`${environment.apiURL}/game/${gameId}`);
  }
}
