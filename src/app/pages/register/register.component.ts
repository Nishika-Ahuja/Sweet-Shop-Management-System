import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
  username: this.username,
  password: this.password
}).subscribe(() => {
  this.auth.login({ username: this.username, password: this.password }).subscribe((res: any) => {
    this.auth.saveToken(res.access_token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('is_admin', res.is_admin.toString());

    if (res.is_admin === 1) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  });
});

  }
}
