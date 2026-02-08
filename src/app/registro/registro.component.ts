import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}