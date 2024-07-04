import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router,private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration failed', error);
      // Gestisci l'errore di registrazione qui
    });
  }
}
