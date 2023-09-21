import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://650aa4dbdfd73d1fab08a2d0.mockapi.io/api/v1'

  constructor(private http: HttpClient) {}

  getUserList(): Observable<Omit<User, 'isEdit'>[]> {
    return this.http.get<Omit<User, 'isEdit'>[]>(`${this.apiUrl}/users`)
  }

  createUser(payload: Omit<User, 'isEdit' | 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, payload);
  }

  // updateItem(itemId: number, updatedItem: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/items/${itemId}`, updatedItem);
  // }

  // deleteItem(itemId: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/items/${itemId}`);
  // }
}
