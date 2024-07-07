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
    'Bio T-shirt - Colore Sabbia': 'assets/images/Bio T-shirt - Colore Sabbia.png',
    'BioChino-Colore Oliva': 'assets/images/BioChino-Colore Oliva.png',
    'Camicia jeans organico': 'assets/images/Camicia jeans organico.png',
    'Felpa con cappuccio cotone organico - Colore blu notte': 'assets/images/Felpa con cappuccio cotone organico - Colore blu notte.png',
    'Camicia cotone organico - Colore Ruggine': 'assets/images/Camicia cotone organico - Colore Ruggine.png',
    'Camica Classica Eco Tessuto - Colore Blu a righe': 'assets/images/Camica Classica Eco Tessuto - Colore Blu a righe.png',
    'Camicia - Colore Blu Notte': 'assets/images/Camicia - Colore Blu Notte.png',
    'Camicia Bio - Colore Sabbia': 'assets/images/Camicia Bio - Colore Sabbia.png',
    'Cappellino Eco - Bianco': 'assets/images/Cappellino Eco - Bianco.png',
    'Giacca Eco - Colore Bianco': 'assets/images/Giacca Eco - Colore Bianco.png',
    'Giacca Eco - Colore Crema': 'assets/images/Giacca Eco - Colore Crema.png',
    'Girocollo cotone organico - Colore Rosso': 'assets/images/Girocollo cotone organico - Colore Rosso.png',
    'Polo ricamata - Colore Nero': 'assets/images/Polo ricamata - Colore Nero.png',
    'T-Shirt Bio - Colore Verde Militare': 'assets/images/T-Shirt Bio - Colore Verde Militare.png',
    'Zaino Organico - Colore atracite': 'assets/images/Zaino Organico - Colore atracite.png',
    'Smanicata Eco - Colore atracite': 'assets/images/Smanicata Eco - Colore atracite.png',
    'Giacca invernale Piuma solidale - Colore atracite': 'assets/images/Giacca invernale Piuma solidale - Colore atracite.png',
    'Smanicato Tecnico - Colore Atracite': 'assets/images/Smanicato Tecnico - Colore Atracite.png',
    'BioChino - Colore Sabbia': 'assets/images/BioChino - Colore Sabbia.png',
    'BioChino- Colore Nero': 'assets/images/BioChino- Colore Nero.png'
    // Aggiungi altre mappature qui
  };
}
