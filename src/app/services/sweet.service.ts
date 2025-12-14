import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Sweet } from '../models/sweet.model';

@Injectable({
  providedIn: 'root'
})
export class SweetService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all sweets
  getAllSweets() {
    return this.http.get<Sweet[]>(`${this.apiUrl}/sweets`);
  }

  searchSweets(filters: any) {
    let params = new HttpParams();

    if (filters.name) {
      params = params.set('name', filters.name);
    }

    if (filters.category) {
      params = params.set('category', filters.category);
    }

    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      params = params.set('minPrice', filters.minPrice);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    return this.http.get<Sweet[]>(
      `${this.apiUrl}/sweets/search`,
      { params }
    );
  }

  restockSweet(id: number, quantity: number) {
    return this.http.post(
      `${this.apiUrl}/sweets/${id}/restock`,
      { quantity }
    );
  }
  
  // Add new sweet (Admin)
  addSweet(sweet: Sweet) {
    return this.http.post(`${this.apiUrl}/sweets`, sweet);
  }

  // Update sweet
  updateSweet(id: number, sweet: Sweet) {
    return this.http.put(`${this.apiUrl}/sweets/${id}`, sweet);
  }

  // Delete sweet
  deleteSweet(id: number) {
    return this.http.delete(`${this.apiUrl}/sweets/${id}`);
  }

  // Purchase sweet
  purchaseSweet(id: number) {
    return this.http.post(`${this.apiUrl}/sweets/${id}/purchase`, {});
  }

  getMyPurchases() {
  return this.http.get<any[]>(
    `${this.apiUrl}/users/me/purchases`
  );
}

getAllPurchasesForAdmin() {
  return this.http.get<any[]>(`${this.apiUrl}/admin/purchases`);
}

}
