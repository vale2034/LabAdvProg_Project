import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  deliveryInfo = { firstName: '', lastName: '', address: '',phonePrefix: '', phone: '', email: '' };
  paymentInfo = { method: 'creditCard', cardNumber: '', expiryDate: '', cvv: '' };
  deliveryConfirmed = false;
  paymentConfirmed = false;
  cartItems: any[] = [];
  userId: number; // Assumi un ID utente statico per ora
  totalPrice: number = 0;
  selectedShipmentType: string | null = null;
  shipmentConfirmed = false;
  shipmentInfo: any= {}; 


  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { 
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.apiService.getCartItems(this.userId).subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  confirmDeliveryInfo(): void {
    this.deliveryConfirmed = true;
  }

  editDeliveryInfo(): void {
    this.deliveryConfirmed = false;
  }

  confirmPaymentInfo(): void {
    this.paymentConfirmed = true;
  }

  editPaymentInfo(): void {
    this.paymentConfirmed = false;
  }

  editShipmentInfo(): void {
    this.shipmentConfirmed = false;
  }


  getShippingCost(): number {
    if (this.shipmentConfirmed) {
      switch (this.selectedShipmentType) {
        case 'electricVehicle':
          return 0; // Spedizione gratuita
        case 'hybridVehicle':
          return 5; // Costo aggiuntivo di 5 euro
        case 'thermalVehicle':
          return 10; // Costo aggiuntivo di 10 euro
      }
    }
    return 0;
  }
  
  getTotalWithShipping(): number {
    let totalPrice = this.cartItems.reduce((total, item) => total + item.prezzo * item.quantity, 0);
    return totalPrice + this.getShippingCost();
  }

  placeOrder(): void {
    const userId = this.authService.getUserId(); // Assumi un ID utente statico per ora
    const totalPrice = this.getTotalWithShipping();
    this.apiService.createOrder(userId, totalPrice).subscribe(
      response => {
        console.log('Order placed successfully', response);
        alert('Order placed successfully!');
        // Chiamata al metodo per resettare il carrello
        this.apiService.clearCart(userId).subscribe(
          () => {
            console.log('Cart cleared successfully');
            this.cartItems = []; // Svuota localmente l'array di elementi del carrello
            window.appComponent.loadCartItemCount();
          },
          error => {
            console.error('Error clearing cart:', error);
          }
        );     

        this.router.navigate(['/']);
      },
      error => {
        console.error('Error placing order', error);
      }
    );
  }

  confirmShipmentType(): void {
    // Implementazione per confermare il tipo di spedizione selezionato
    if (this.selectedShipmentType) {
      this.shipmentConfirmed = true;
    }
  }

  editShipmentType(): void {
    // Implementazione per modificare la selezione del tipo di spedizione
    this.shipmentConfirmed = false;
    this.selectedShipmentType = null; // Resettare il tipo di spedizione selezionato
  }
  



  itemsImages: { [key: string]: string } = {
    'Iphone15': 'assets/images/Iphone15.png',
    'Galaxy Tab': 'assets/images/Galaxy Tab.jpg',
    'Nexus': 'assets/images/Nexus.png',
    'Coffe machine': 'assets/images/Coffe machine.png',
    'alexa': 'assets/images/alexa.jpg'

    // Aggiungi altre mappature qui
  };


 
  phoneInvalid(): boolean {
    // Validazione del numero di telefono
    const phoneNumber = this.deliveryInfo.phone.trim();
    return !(phoneNumber.length === 10 && /^\d+$/.test(phoneNumber));
  }

  creditCardInvalid(): boolean {
    // Validazione del numero di telefono
    const cardNumber = this.paymentInfo.cardNumber.trim();
    return !(cardNumber.length === 16 && /^\d+$/.test(cardNumber));
  }

  cvcInvalid(): boolean {
    // Validazione del numero di telefono
    const cvc = this.paymentInfo.cvv.trim();
    return !(cvc.length === 3 && /^\d+$/.test(cvc));
  }

  isValidExpiryDate(): boolean {
    if (!this.paymentInfo.expiryDate) {
      return false;
    }
    
    // Utilizzare una regex per verificare il formato dd/mm/yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(this.paymentInfo.expiryDate);

  }

}
