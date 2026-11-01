import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlantList } from './plant-list/plant-list';

@Component({
  imports: [RouterOutlet, PlantList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('plantas_frontend');
  protected readonly anio = signal(new Date().getFullYear());
}