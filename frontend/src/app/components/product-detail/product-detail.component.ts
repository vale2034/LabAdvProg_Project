import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  userId = 1; // Sostituisci con l'ID dell'utente attuale


  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getProduct(Number(id)).subscribe((data:any) => {
      this.product = data;
    });
  }

  addToCart(productId: number): void {
    this.apiService.addToCart(this.userId, productId, 1).subscribe(response => {
      console.log('Product added to cart:', response);
    });
  }

}

