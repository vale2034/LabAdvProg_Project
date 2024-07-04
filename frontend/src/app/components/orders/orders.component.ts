import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orders: any[] = [];
  userId = this.authService.getUserId(); // Sostituisci con l'ID dell'utente attuale
  username!: string;


  constructor(private route: ActivatedRoute, private apiService: ApiService,private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Assicurati di avere il metodo getUserId nell'AuthService
    this.username = this.authService.getUsername(); // Assicurati di avere il metodo getUsername nell'AuthService

    this.apiService.getOrders(this.userId).subscribe(
      (data: any) => {
        this.orders = data;
      },
      (error) => {
        console.error('Errore durante il recupero degli ordini:', error);
      }
    );
  }
  



  itemsImages: { [key: string]: string } = {
    'Iphone15': 'assets/images/Iphone15.png',
    'Galaxy Tab': 'assets/images/Galaxy Tab.jpg',
    'Nexus': 'assets/images/Nexus.png',
    'Coffe machine': 'assets/images/Coffe machine.png',
    'alexa': 'assets/images/alexa.jpg'

    // Aggiungi altre mappature qui
  };


  removeOrder(orderId: number) {
    this.apiService.deleteOrder(orderId).subscribe(() => {
      // Rimuovi l'ordine dall'array orders dopo averlo rimosso dal server
      this.orders = this.orders.filter(order => order.id !== orderId);
      console.log("Ordine con id: " + orderId + " eliminato con successo")
    }, error => {
      console.error('Errore nella rimozione dell\'ordine:', error);
      // Gestisci l'errore, se necessario
    });
  }


}
