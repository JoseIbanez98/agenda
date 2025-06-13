import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { login } from '../Models/login';
import {
  operationRequest,
  operationRequestAuth,
} from '../Models/operation-request';
import { BehaviorSubject, catchError, map, switchMap, throwError } from 'rxjs';
import { environment } from '../Environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refreshing = false;
  // private loginUrl = environment.apiUrl + environment.endPointLogin;
  private loginUrl = environment.SUPABASE_URL 
  private refreshUrl = environment.apiUrl + environment.endPointRefreshToken;

  constructor(private httpClient: HttpClient, private routerLink: Router) {}

  login(credentials: login): Observable<operationRequest<login>> {
    return this.httpClient
      .post<operationRequest<login>>(this.loginUrl, credentials)
      .pipe(
        tap((response: operationRequestAuth) => {
          if (response.data)
            this.setTokens(
              response.data.accesToken,
              response.data.refreshToken
            );
          else alert(response.message);
        })
      );
  }

  getRoleFromToken(): number {
    const rol = Number.parseInt(localStorage.getItem('rol') || '0', 10);
    return rol;
  }

  fetchWithToken<T>(method: string, url: string, data?: any): Observable<T> {
    switch (method.toUpperCase()) {
      case 'GET':
        return this.httpClient.get<T>(url);
      case 'POST':
        return this.httpClient.post<T>(url, data);
      case 'PUT':
        return this.httpClient.put<T>(url, data);
      case 'DELETE':
        return this.httpClient.delete<T>(url);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
  get accessToken() {
    return localStorage.getItem('acces_token');
  }

  get refreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setTokens(access: string, refresh: string) {
    localStorage.setItem('acces_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  refreshAccessToken() {
    if (this.refreshing) return throwError(() => 'Ya está actualizando');

    this.refreshing = true;

    return this.httpClient
      .post<any>(`${this.refreshUrl}?refreshToken=${this.refreshToken}`, null)
      .pipe(
        map((res) => {
          
          this.setTokens(res.data.accesToken, res.data.refreshToken);
          this.refreshing = false;

          return res.data.accesToken;
        }),
        catchError((err) => {
          this.refreshing = false;
          return throwError(() => err);
        })
      );
  }
  logout() {
    this.routerLink.navigate(['"login']);
  }
}
