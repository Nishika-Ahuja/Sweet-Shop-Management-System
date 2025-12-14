import { Component, OnInit } from '@angular/core';
import { SweetService } from '../../services/sweet.service';
import { Sweet } from '../../models/sweet.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sweets: Sweet[] = [];

  // Search inputs 
  searchName: string = '';
  searchCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private sweetService: SweetService) {}

  ngOnInit(): void {
    this.loadSweets();
  }

  // Load all sweets
  loadSweets(): void {
    this.sweetService.getAllSweets().subscribe({
      next: (data) => {
        this.sweets = data;
      },
      error: () => {
        alert('Failed to load sweets');
      }
    });
  }

  // Purchase a sweet
  buySweet(id: number): void {
    this.sweetService.purchaseSweet(id).subscribe({
      next: () => {
        this.loadSweets();
      },
      error: () => {
        alert('Sweet is out of stock');
      }
    });
  }

  // Search sweets by filters
  search(): void {
    const filters: any = {};

    if (this.searchName) {
      filters.name = this.searchName;
    }

    if (this.searchCategory) {
      filters.category = this.searchCategory;
    }

    if (this.minPrice !== null) {
      filters.minPrice = this.minPrice;
    }

    if (this.maxPrice !== null) {
      filters.maxPrice = this.maxPrice;
    }

    this.sweetService.searchSweets(filters).subscribe({
      next: (data) => {
        this.sweets = data;
      },
      error: () => {
        alert('Search failed');
      }
    });
  }

  // Reset search and reload all sweets
  clearSearch(): void {
    this.searchName = '';
    this.searchCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.loadSweets();
  }
}
