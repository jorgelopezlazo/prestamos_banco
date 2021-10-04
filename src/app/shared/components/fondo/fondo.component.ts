import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.scss']
})
export class FondoComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

 Environment: any = environment;

}
