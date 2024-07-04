import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedInStatus = this.loggedIn.asObservable();
  private username = '';
  private userId: number = 1;


  constructor(private apiService: ApiService) {
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.apiService.register(username, email, password);
  }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.apiService.login(username, password).subscribe(response => {
        this.username = username;
        this.setUserId(response.userId); // Assumendo che la risposta contenga userId
        this.loggedIn.next(true);
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }

  logout() {
    this.username = '';
    this.loggedIn.next(false);
  }

  getUsername() {
    return this.username;
  }


  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  setUsername(username: string): void {
    this.username = username;
  }

 
}
