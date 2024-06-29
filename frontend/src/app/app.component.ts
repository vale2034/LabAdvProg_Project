import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartItemCount = 0;
  products: any[] = [];
  title: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    // this.loadCartItemCount();
  }

  loadCartItemCount(): void {
    const userId = 1; // Sostituisci con l'ID dell'utente attuale
    this.apiService.getCart(userId).subscribe(cartItems => {
      this.cartItemCount = cartItems.reduce((sum: any, item: any) => sum + item.quantity, 0);
    });
  }

  loadProducts(): void {
    console.log("Caricamento Prodotti");
    this.apiService.getProducts().subscribe(
      (products: any[]) => {
        console.log(products);
        this.products = products; // Assegna i dati al tuo array di prodotti nel componente
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  


  addToCart(productId: number): void {
    const userId = 1; // Sostituisci con l'ID dell'utente attuale
    const quantity = 1; // Puoi modificare questo valore o ottenere la quantità dinamicamente
    this.apiService.addToCart(userId, productId, quantity).subscribe(() => {
      this.loadCartItemCount();
    });
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
