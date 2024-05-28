import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);

  login(event: Event) {
    event.preventDefault();
    console.log(`Login: ${this.email} / ${this.password}`);
    this.authService.login(this.email, this.password).subscribe(() => {
      alert('Login success!');
      this.router.navigate(['/']);
    });
  }
}
