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
    'Iphone15': 'assets/images/Iphone15.png',
    'Galaxy Tab': 'assets/images/Galaxy Tab.jpg',
    'Nexus': 'assets/images/Nexus.png',
    'Coffe machine': 'assets/images/Coffe machine.png',
    'alexa': 'assets/images/alexa.jpg'

    // Aggiungi altre mappature qui
  };


}

