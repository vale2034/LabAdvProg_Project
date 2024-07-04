import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var window: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  userId= this.authService.getUserId() ; // Sostituisci con l'ID dell'utente attuale
  cartItems: any[] = [];

  constructor(private apiService: ApiService,private router: Router,private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data:any) => {
      this.products = data;
    });
  }

  //metodo view product detail

  addToCart(productId: number): void {
    console.log('Prodotto ID: ' + productId + ' aggiunto al carrello');
    
    const quantity = 1; // Esempio: modificare questo valore o ottenerlo dinamicamente
    console.log('USER ID:', this.authService.getUserId()); // Verifica l'ID utente nel log
    
    this.apiService.addToCart(this.authService.getUserId(), productId, quantity).subscribe(
      (cartItem) => {
        console.log('Prodotto aggiunto al carrello:', cartItem);
        window.appComponent.loadCartItemCount();
      },
      (error) => {
        console.error('Errore durante l\'aggiunta al carrello:', error);
      }
    );
  }
  
  



  productImages: { [key: string]: string } = {
    'Iphone15': 'assets/images/Iphone15.png',
    'Galaxy Tab': 'assets/images/Galaxy Tab.jpg',
    'Nexus': 'assets/images/Nexus.png',
    'Coffe machine': 'assets/images/Coffe machine.png',
    'alexa': 'assets/images/alexa.jpg'

    // Aggiungi altre mappature qui
  };
  
}
