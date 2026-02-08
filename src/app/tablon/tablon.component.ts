import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-tablon',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './tablon.component.html',
  styleUrls: ['./tablon.component.scss'],
})
export class TablonComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}