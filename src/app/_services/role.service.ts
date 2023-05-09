import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/roles';

const ROLEROUTE = 'https://localhost:7032/api/Role';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(ROLEROUTE, httpOptions);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${ROLEROUTE}/${id}`, httpOptions);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(ROLEROUTE, role, httpOptions);
  }

  update(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${ROLEROUTE}/${id}`, role, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${ROLEROUTE}/${id}`, httpOptions);
  }
}
