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
  menuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {
    this.auth.username$.subscribe(name => this.username = name);
    this.auth.isAdmin$.subscribe(admin => this.isAdmin = admin);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
