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
