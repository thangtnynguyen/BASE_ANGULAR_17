import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LocalstorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}

  login(data: any): Observable<any> {
    // return this.http.post(`${environment.apiUrl}/usuario/login`, data);
    return new Observable((observer) => {
      observer.next(`${data} token`);
    });
  }

  logout(): void {
    this.localstorageService.removeItem('token');
    this.localstorageService.removeItem('refreshToken');
    this.router.navigateByUrl('/signin');
  }

  refreshToken(data: any): Observable<any> {
    return new Observable((observer) => {
      observer.next('token');
    });
  }

  isLogged(): boolean {
    return !!this.localstorageService.getItem('token');
  }

  SetToken(token: string): void {
    this.localstorageService.setItem('token', token);
  }

  SetRefreshToken(refreshToken: string): void {
    this.localstorageService.setItem('refreshToken', refreshToken);
  }

  GetToken(): string {
    return this.localstorageService.getItem('token') || '';
  }

  GetRefreshToken(): string {
    return this.localstorageService.getItem('refreshToken') || '';
  }
}
