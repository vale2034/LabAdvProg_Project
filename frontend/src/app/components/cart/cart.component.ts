import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId = 1; // Sostituisci con l'ID dell'utente attuale

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.apiService.getCart(this.userId).subscribe(data => {
      this.cartItems = data;
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.apiService.updateCartItem(this.userId, productId, quantity).subscribe(response => {
      console.log('Cart item updated:', response);
      this.loadCart(); // Ricarica il carrello dopo l'aggiornamento
    });
  }
}
