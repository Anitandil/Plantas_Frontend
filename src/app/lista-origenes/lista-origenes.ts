import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'lista-origenes',
  styleUrl: './lista-origenes.scss',
  templateUrl: './lista-origenes.html',
})

export class ListaOrigenes {
  origenes = []; // después los traés del service
}
