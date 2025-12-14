import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Sweet } from '../models/sweet.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  private _username = new BehaviorSubject<string>(localStorage.getItem('username') || '');
  username$ = this._username.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(localStorage.getItem('is_admin') === '1');
  isAdmin$ = this._isAdmin.asObservable();

  constructor(private http: HttpClient) {}


  login(userData: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, userData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUser(username: string, isAdmin: boolean) {
    localStorage.setItem('username', username);
    localStorage.setItem('is_admin', isAdmin ? '1' : '0');
    this._username.next(username);
    this._isAdmin.next(isAdmin);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin');
    this._username.next('');
    this._isAdmin.next(false);
  }

  register(userData: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(`${this.apiUrl}/auth/register`, userData, { headers });
}

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }


  // Search sweets
searchSweets(filters: any) {
  return this.http.get<Sweet[]>(
    `${this.apiUrl}/sweets/search`,
    { params: filters }
  );
}

// Restock sweet (Admin)
restockSweet(id: number, quantity: number) {
  return this.http.post(
    `${this.apiUrl}/sweets/${id}/restock`,
    { quantity }
  );
}

}
