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

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }


  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, { user_id: userId, product_id: productId, quantity }).pipe(
      catchError(this.handleError)
    );
  }

  getCartItems(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/items/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateCartItem(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cart/${userId}/${productId}`, { quantity }).pipe(
      catchError(this.handleError)
    );
  }

  createOrder(userId: number, totalPrice: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, { user_id: userId, total_price: totalPrice }).pipe(
      catchError(this.handleError)
    );
  }

  getOrders(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
