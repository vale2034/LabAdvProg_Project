import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }


  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, email, password }).pipe(
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      catchError(this.handleError)
    );
  }





  //--------------------------------------------------- PRODOTTI ----------------------------------------------------------------------------------------- //


  //----- Ottieni Prodotti 
  getProducts(): Observable<any> {
    console.log(`GET request to: ${this.baseUrl}/products`);  // Log the URL being requested
    return this.http.get(`${this.baseUrl}/products`)
      .pipe(
        catchError(this.handleError)
      );
  }



   //----- Ottieni Prodotto 
  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`);

  }
    //----------------------------------------------------------------------------------------------------------------------------------------------------------- //
   //------------------------------------------------------  CARRELLO --------------------------------------------------------------------------- //

  

   addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/cart`;
    const body = { userId, productId, quantity };
    return this.http.post<any>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding to cart:', error);
        return throwError(error);
      })
    );
  }

  // Metodo getCart in api.service.ts
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/${userId}`).pipe(
      catchError(this.handleError)
    );
  }


  // Rimuove item dal carrello -- FA LA DELETE
  removeFromCart(userId: number, itemId: number): Observable<any> {
    const url = `${this.baseUrl}/cart/${userId}/${itemId}`;
    return this.http.delete<any>(url);
  }

  // Rimuove tutti gli elementi dal carrello
  clearCart(userId: number): Observable<any> {
    const url = `${this.baseUrl}/cart/${userId}`;
    return this.http.delete<any>(url);
  }

  updateCartItem(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cart/${userId}/${productId}`, { quantity }).pipe(
      catchError(this.handleError)
    );
  }

  getCartItems(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

 

  //----------------------------------------------------------------------------------------------------------------------------------------------------------- //


  //----------------------------------------------------------------- ORDINI ---------------------------------------------------------------------- //

  createOrder(userId: number, totalPrice: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, { user_id: userId, total_price: totalPrice }).pipe(
      catchError(this.handleError)
    );
  }

  getOrders(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${userId}`).pipe(
      catchError(this.handleError)
    );
  }


  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

