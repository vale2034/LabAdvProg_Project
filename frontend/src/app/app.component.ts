import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartComponent } from './components/cart/cart.component';


declare global {
  interface Window {
    appComponent: AppComponent; // Dichiarazione di appComponent come variabile globale di tipo AppComponent
    cartComponent: CartComponent;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartItemCount = 0;
  products: any[] = [];
  title: any;
  cartItems: any[] = [];
  currentUser: any;
  isLoggedIn = false;
  username = '';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
    window.appComponent = this;
    this.authService.loggedInStatus.subscribe(status => {
      this.isLoggedIn = status;
      this.username = this.authService.getUsername();
    });
   }

  ngOnInit(): void {
    this.loadCartItemCount();
  }

  loadCartItemCount(): void {
    const userId = this.authService.getUserId(); // Sostituisci con l'ID dell'utente attuale
    this.apiService.getCart(userId).subscribe(cartItems => {
      this.cartItemCount = cartItems.reduce((sum: any, item: any) => sum + item.quantity, 0);
    });
  }


  fetchOrders() {
    const userId = 1; // Sostituisci con l'ID dell'utente corrente, se disponibile
    this.apiService.getOrders(userId).subscribe(
      (orders) => {
        console.log('Orders:', orders);
        // Naviga al componente degli ordini e passa gli ordini come parametro
        this.router.navigate(['/orders', userId], { state: { orders: orders } });
      },
      (error) => {
        console.error('Error fetching orders:', error);
        // Gestisci l'errore qui se necessario
      }
    );
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



}
