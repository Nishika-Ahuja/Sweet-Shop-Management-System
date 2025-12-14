import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Sweet } from '../models/sweet.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(`${this.apiUrl}/auth/register`, userData, { headers });
}

  // Login user
  login(userData: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, userData);
  }

  // Save token in browser
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
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
