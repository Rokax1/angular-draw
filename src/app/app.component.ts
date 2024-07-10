import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LienzoComponent } from './components/lienzo/lienzo.component';
import { Lienzov2Component } from './components/lienzov2/lienzov2.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LienzoComponent,Lienzov2Component,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-draw';
}
