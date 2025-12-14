import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = '';
  isAdmin = false;

  constructor(public auth: AuthService, private router: Router) {}

  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}


  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.isAdmin = localStorage.getItem('is_admin') === '1';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
