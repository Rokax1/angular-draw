import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private url = 'http://localhost:4000';

  constructor() {
    this.socket = io(this.url);
  }

  public sendDrawing(data: any): void {
    this.socket.emit('drawing', data);
  }

  public receiveDrawing(callback: (data: any) => void): void {
    this.socket.on('drawing', callback);
  }

  public sendName(name: string): void {
    this.socket.emit('set_name', name);
  }

  public onClientsUpdate(callback: (clients: any[]) => void): void {
    this.socket.on('clients_update', callback);
  }
}
