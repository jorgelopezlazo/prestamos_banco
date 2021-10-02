import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    <span>Bienvenido a Banco de México</span>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { }
