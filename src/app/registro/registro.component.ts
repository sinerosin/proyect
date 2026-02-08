import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nuevoNinja = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {}
  onRegister() {
    if (!this.nuevoNinja.username || !this.nuevoNinja.email || !this.nuevoNinja.password) {
      alert('Por favor, completa todos los campos del pergamino de registro.');
      return;
    }
    this.authService.register(this.nuevoNinja).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        alert('¡Bienvenido a la aldea!.');
        this.router.navigate(['/tablon']);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        alert('Hubo un error en el sello de registro. Revisa los datos.');
      }
    });
  }
}