import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SweetService } from '../services/sweet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  isAdmin = false;
  purchases: any[] = []; 

  constructor(public auth: AuthService, private sweetService: SweetService) {}

ngOnInit(): void {
  this.username = localStorage.getItem('username') || '';
  this.isAdmin = localStorage.getItem('is_admin') === '1';

  if (this.auth.isLoggedIn()) {
    if (this.isAdmin) {
      this.loadAllPurchases();   
    } else {
      this.loadMyPurchases();    
    }
  }
}

// USER purchases
loadMyPurchases() {
  this.sweetService.getMyPurchases().subscribe({
    next: (data) => {
      this.purchases = data;
    },
    error: () => console.log('Failed to load user purchases')
  });
}

// ADMIN purchases
loadAllPurchases() {
  this.sweetService.getAllPurchasesForAdmin().subscribe({
    next: (data) => {
      this.purchases = data;
    },
    error: () => console.log('Failed to load admin purchases')
  });
}
}
