import { Injectable } from '@angular/core';
import socketIOClient from "socket.io-client";

import { environment } from "../../environments/environment";

const socket = socketIOClient(`${environment.apiURL}/`, {
  "force new connection": true,
  "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  "timeout": 10000,                  //before connect_error and connect_timeout are emitted.
});

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: socketIOClient;

  constructor() {
    this.socket = socket;
  }
}
