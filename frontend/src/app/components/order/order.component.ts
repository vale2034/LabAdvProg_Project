import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  userId: number = 1; // Assumi un ID utente statico per ora

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOrders(this.userId).subscribe((data:any) => {
      this.orders = data;
    });
  }
}
