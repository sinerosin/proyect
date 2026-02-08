import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { AuthResponse } from '../modelos/auth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res: AuthResponse) => {
        console.log('Ninja autenticado', res);
        this.router.navigate(['/tablon']);
      },
      error: (err) => {
        console.error('Error de acceso', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}