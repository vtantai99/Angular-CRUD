import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserPayload } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://650aa4dbdfd73d1fab08a2d0.mockapi.io/api/v1'

  constructor(private http: HttpClient) {}

  getUserList(): Observable<Omit<UserPayload, 'isEdit'>[]> {
    return this.http.get<Omit<UserPayload, 'isEdit'>[]>(`${this.apiUrl}/users`)
  }

  createUser(user: UserPayload): Observable<UserPayload> {
    return this.http.post<UserPayload>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: Partial<UserPayload>): Observable<UserPayload> {
    return this.http.put<UserPayload>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: UserPayload['id']): Observable<UserPayload> {
    return this.http.delete<UserPayload>(`${this.apiUrl}/users/${userId}`);
  }
}
