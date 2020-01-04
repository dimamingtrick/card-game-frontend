import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from "rxjs";
// import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  public startGame(): Observable<Object | ErrorResponse> {
    return this.http.get("http://localhost:8080/game/start-game");
      // .pipe(
      //   catchError(error => {
      //     return of(error);
      //   })
      // );
  }

  public selectCard(gameId: String, cards: Array<String>): Observable<Object | ErrorResponse>  {
    return this.http.post(`http://localhost:8080/game/${gameId}/select-card`, { cards });
  }
}
