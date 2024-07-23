import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

declare var window: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  userId:number; // Sostituisci con l'ID dell'utente attuale
  cartItems: any[] = [];
  products: any[] = [];
  quantity: number = 1; // Quantità iniziale impostata su 1


  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService) { 
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadProductDetails();
  }




  loadProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getProduct(productId).subscribe(
        (product: any) => {
          this.product = product;
        },
        (error: any) => {
          console.error('Errore durante il recupero del prodotto:', error);
        }
      );
    } else {
      console.error('Nessun ID prodotto trovato nella rotta.');
    }
  }


  addToCart(productId: number): void {
    const userId = this.authService.getUserId(); // Sostituisci con l'ID dell'utente corrente
    this.apiService.addToCart(userId, productId, this.quantity).subscribe(
      () => {
        window.appComponent.loadCartItemCount();
      },
      (error) => console.error('Errore durante l\'aggiunta al carrello:', error)
    );
  }



  productImages: { [key: string]: string } = {
    'Bio T-shirt - Colore Sabbia': 'assets/images/Bio T-shirt - Colore Sabbia.png',
    'BioChino -  Colore Oliva': 'assets/images/BioChino -  Colore Oliva.png',
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

