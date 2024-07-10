import { Component, ViewChild } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-lienzo',
  standalone: true,
  imports: [],
  templateUrl: './lienzo.component.html',
  styleUrl: './lienzo.component.scss'
})
export class LienzoComponent {
  canvasWidth: number = 700;
  canvasHeight: number = 600;
  isDrawing: boolean = false;
  trazos: { color: string, grosor: number, trazo: Path2D }[] = [];

  @ViewChild('canvas') canvas: any;
  ctx: any;

  context: CanvasRenderingContext2D | null = null;
  penColor: string = '#000000';
  penThickness: number = 0;
  selectedTool: string = 'pen';
  selectedColor: string = '000000';
  backgroundImage: HTMLImageElement = new Image();

  constructor(private socketService: SocketService) {}


  ngOnInit(): void {

    this.socketService.receiveDrawing((data) => {
      console.log(data,"data desde el socket service")
      this.draw(data);
    });
  }

  startDrawin($event: MouseEvent, color: any, grosor: any): void {
    console.log("empeznado a dibujar");
    this.isDrawing = true;
    const nuevoTrazo = new Path2D();
    nuevoTrazo.moveTo($event.offsetX, $event.offsetY);
    this.trazos.push({ trazo: nuevoTrazo, color: color, grosor: grosor });




  }

  draw($event: MouseEvent): void {
    console.log("dibunado");
    if (this.isDrawing){
      const trazoActual = this.trazos[this.trazos.length - 1];
      trazoActual.trazo.lineTo($event.offsetX, $event.offsetY);
      this.ctx.strokeStyle = trazoActual.color;
      this.ctx.lineWidth = trazoActual.grosor;
      this.ctx.stroke(trazoActual.trazo)

      this.socketService.sendDrawing({data: trazoActual.trazo, drawing: this.isDrawing });

    }
    
  }

  enDrawing() {
    console.log("dejando de sibujar");
    this.isDrawing = false;

  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const backgroundImage = new Image();
    //backgroundImage.src = 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.6435-9/119527466_2839728002915311_9171879753956805663_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGo6GJodWjEwDinbXLfxBnrA8PYUkXPDQQDw9hSRc8NBIuxEzxhaUj1WbMOOjirAMbctznQVe4zeP_IirgTVmKg&_nc_ohc=neqge0ZlRkgQ7kNvgEYMl2u&_nc_ht=scontent.fscl1-1.fna&oh=00_AYA0tqwkGyHV0oNUMg0Ft_AEFFN55PIpZ0J638X0q8LdDQ&oe=66A07489';
    backgroundImage.onload = () => {
      this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };
  }

  clearCanvas() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const backgroundImage = new Image();
      //backgroundImage.src = 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.6435-9/119527466_2839728002915311_9171879753956805663_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGo6GJodWjEwDinbXLfxBnrA8PYUkXPDQQDw9hSRc8NBIuxEzxhaUj1WbMOOjirAMbctznQVe4zeP_IirgTVmKg&_nc_ohc=neqge0ZlRkgQ7kNvgEYMl2u&_nc_ht=scontent.fscl1-1.fna&oh=00_AYA0tqwkGyHV0oNUMg0Ft_AEFFN55PIpZ0J638X0q8LdDQ&oe=66A07489';
      backgroundImage.onload = () => {
        this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      };
      this.trazos = [];
    }
  }

  cambiarGrosor(nuevoGrosor: number): void {
    this.penThickness = nuevoGrosor;
    this.ctx.lineWidth = this.penThickness;
  }
  seleccionarGrosor(grosor: number) {
    this.cambiarGrosor(grosor);
  }

  cambiarColor(nuevoColor: string): void {
    this.penColor = nuevoColor;
    this.ctx.strokeStyle = nuevoColor;
  }

  regresarUltimoTrazo() {
    if (this.trazos.length > 0) {
      this.trazos.pop();

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const backgroundImage = new Image();
      //backgroundImage.src = 'https://scontent.fscl1-1.fna.fbcdn.net/v/t1.6435-9/119527466_2839728002915311_9171879753956805663_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGo6GJodWjEwDinbXLfxBnrA8PYUkXPDQQDw9hSRc8NBIuxEzxhaUj1WbMOOjirAMbctznQVe4zeP_IirgTVmKg&_nc_ohc=neqge0ZlRkgQ7kNvgEYMl2u&_nc_ht=scontent.fscl1-1.fna&oh=00_AYA0tqwkGyHV0oNUMg0Ft_AEFFN55PIpZ0J638X0q8LdDQ&oe=66A07489';
      backgroundImage.onload = () => {
        this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      };

      this.trazos.forEach((trazo) => {
        this.ctx.strokeStyle = trazo.color;
        this.ctx.lineWidth = trazo.grosor;
        this.ctx.stroke(trazo.trazo);
      });
    }
  }



}
