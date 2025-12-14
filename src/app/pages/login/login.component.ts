import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}
  
login() {
  this.auth.login({ username: this.username, password: this.password })
    .subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token);
        this.auth.setUser(this.username, res.is_admin === 1);

        if (res.is_admin === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        alert(err.error.detail || 'Login failed: Invalid credentials');
      }
    });
};




}


