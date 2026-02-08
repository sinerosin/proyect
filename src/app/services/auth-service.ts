import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { AuthResponse } from '../modelos/auth-response';
import { Ninja } from '../modelos/ninja';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://pr3-lista-misiones-konoha-backend.vercel.app/auth';
  private authStatus = new BehaviorSubject<Ninja|null>(null);

  constructor(private http: HttpClient) {
  }

  
  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, datos);
  }
  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(async (res) => {
        if (res.token) {
          await Preferences.set({ key: 'token', value: res.token });
          this.authStatus.next(res.user);
        }
      })
    );
  }

  
}
