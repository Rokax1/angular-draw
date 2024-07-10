import { Component, ElementRef, HostListener } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-lienzov2',
  standalone: true,
  imports: [],
  templateUrl: './lienzov2.component.html',
  styleUrl: './lienzov2.component.scss'
})
export class Lienzov2Component {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private name!: string;
  public clients: any[] = [];



  constructor(private socketService: SocketService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.name = prompt("Ingresa tu nombre:") || `Usuario${Math.floor(Math.random() * 1000)}`;
    this.socketService.sendName(this.name);
    this.canvas = this.elRef.nativeElement.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d')!;

    this.socketService.receiveDrawing((data) => {
      this.drawOnCanvas(data);
    });

    this.socketService.onClientsUpdate((clients) => {
      this.clients = clients;
    });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    console.log("mouse down");
    this.drawing = true;
    this.draw(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    console.log("mouse move");
    if (this.drawing) {
      this.draw(event);
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    console.log("mouse up");
    this.drawing = false;
    this.ctx.beginPath();
    this.socketService.sendDrawing({  drawing: this.drawing });

  }

  private draw(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!this.drawing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    } else {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    this.socketService.sendDrawing({ x, y, drawing: this.drawing });
  }

  private drawOnCanvas(data: any): void {
    if (!data.drawing) {
      this.ctx.beginPath();
      this.ctx.moveTo(data.x, data.y);
    } else {
      this.ctx.lineTo(data.x, data.y);
      this.ctx.stroke();
    }
  }
}
