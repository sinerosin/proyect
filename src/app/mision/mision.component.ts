import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Mission } from '../modelos/mission';

@Component({
  selector: 'app-mision',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.scss'],
})
export class MisionComponent implements OnInit {
  mision: Mission | null = null;
  reporteTexto: string = '';
  imagenEvidencia: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.getMisionById(id).subscribe({
        next: (res) => (this.mision = res),
        error: (err) => console.error('Error al cargar misión', err)
      });
    }
  }

  aceptarMision() {
    if (!this.mision) return;
    this.authService.acceptMission(this.mision.id).subscribe(() => {
      alert('¡Misión aceptada!');
      this.router.navigate(['/tablon']);
    });
  }

  capturarEvidencia(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagenEvidencia = reader.result as string);
      reader.readAsDataURL(file);
    }
  }
  
  entregarMision() {
    if (!this.reporteTexto) return alert('Escribe el reporte.');
    alert('Reporte enviado.');
    this.router.navigate(['/tablon']);
  }

  abandonarMision() {
    if (confirm('¿Seguro que quieres abandonar esta misión?')) {
      this.router.navigate(['/tablon']);
    }
  }
}