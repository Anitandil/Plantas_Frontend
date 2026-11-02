import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaPlantas } from './lista-plantas/lista-plantas';

@Component({
  imports: [RouterOutlet, ListaPlantas],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('plantas_frontend');
  protected readonly anio = signal(new Date().getFullYear());
}