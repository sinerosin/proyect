import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router'; 
import { Mission } from '../modelos/mission';
import { AuthService } from '../services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablon',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink,FormsModule], 
  templateUrl: './tablon.component.html',
  styleUrls: ['./tablon.component.scss'],
})
export class TablonComponent implements OnInit {
  listaMisiones: Mission[] = [];
  filtro: string = 'DISPONIBLE';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  this.authService.getMisiones().subscribe({
    next: (data) => {
      this.listaMisiones = data.data;
      console.log('Misiones listas para pintar:', this.listaMisiones);
    },
    error: (err) => {
      console.error('Error al obtener el listado', err);
      this.listaMisiones = []; 
    }
  });
}
get misionesFiltradas() {
    return this.listaMisiones.filter(m => m.status === this.filtro);
  }
}