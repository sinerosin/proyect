import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mision',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.scss'],
})
export class MisionComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}