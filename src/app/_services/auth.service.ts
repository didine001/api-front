import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserDto, User } from '../models/user';
import { Role } from '../models/roles';

const AUTH_API = 'https://localhost:7032/api/Authentication/Login';
const REGISTER_API = 'https://localhost:7032/api/Authentication/Register';
const USERSROUTE = 'https://localhost:7032/api/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      REGISTER_API,
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${USERSROUTE}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(USERSROUTE, httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${USERSROUTE}/${id}`, httpOptions);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${USERSROUTE}/${id}`, user, httpOptions);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(USERSROUTE, user, httpOptions);
  }
}
