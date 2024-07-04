import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

declare var window: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: number ;  

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
   }

  ngOnInit(): void {
    this.loadCart(this.userId)
  }

  loadCart(userId: number): void {
    this.apiService.getCart(userId).subscribe(
      (data) => {
        this.cartItems = data;
        console.log('Cart Items:', this.cartItems); // Controlla qui i dati ricevuti dal backend
      },
      (error) => console.error('Error fetching cart items:', error)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    this.apiService.updateCartItem(this.userId, productId, quantity).subscribe(response => {
      console.log('Cart item updated:', response);
      this.loadCart(this.userId); // Ricarica il carrello dopo l'aggiornamento
    });
  }


  removeFromCart(itemId: number): void {
    console.log('Removing item with ID:', itemId); // Verifica che itemId sia definito e corretto
    this.apiService.removeFromCart(this.userId, itemId).subscribe(response => {
      console.log('Item removed from cart:', response);
      this.loadCart(this.userId); // Ricarica il carrello dopo la rimozione
      window.appComponent.loadCartItemCount();
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }

  

  
  
  
  



  itemsImages: { [key: string]: string } = {
    'Iphone15': 'assets/images/Iphone15.png',
    'Galaxy Tab': 'assets/images/Galaxy Tab.jpg',
    'Nexus': 'assets/images/Nexus.png',
    'Coffe machine': 'assets/images/Coffe machine.png',
    'alexa': 'assets/images/alexa.jpg'

    // Aggiungi altre mappature qui
  };
}
