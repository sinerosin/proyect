import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { AuthResponse } from '../modelos/auth-response';
import { Mission } from '../modelos/mission';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://pr3-lista-misiones-konoha-backend.vercel.app';
  private TOKEN_KEY = 'token'; 

  constructor(private http: HttpClient) {}

  register(datos: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/auth/register`, datos);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(async (res: any) => { 
        if (res.token) {
          await Preferences.set({ 
            key: this.TOKEN_KEY, 
            value: res.token 
          });
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  async logout() {
    await Preferences.remove({ key: this.TOKEN_KEY });
    localStorage.removeItem('token');
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.TOKEN_KEY });
    return value;
  }
  getMisiones() {
  return from(this.getToken()).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return this.http.get<any>(`${this.apiUrl}/missions`, { headers });
    }),
  );
}

  getMisionById(id: string): Observable<Mission> {
    return this.getMisiones().pipe(
      map((res) => res.data.find((mision:any) => mision.id === id))
    );
  }
  acceptMission(id: string): Observable<any> {
    return from(this.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.patch(`${this.apiUrl}/missions/${id}/accept`, {}, { headers });
      })
    );
  }

  completeMission(id: string, reportData: any): Observable<any> {
    return from(this.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post(`${this.apiUrl}/missions/${id}/complete`, reportData, { headers });
      })
    );
  }
  getProfile(): Observable<any> {
    return from(this.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get(`${this.apiUrl}/auth/profile`, { headers });
      })
    );
  }
}