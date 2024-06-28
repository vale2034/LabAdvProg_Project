import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  userId = 1; // Sostituisci con l'ID dell'utente attuale

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(productId: number): void {
    
    this.apiService.addToCart(this.userId, productId, 1).subscribe(response => {
      console.log('Product added to cart:', response);
    });
  }
}
