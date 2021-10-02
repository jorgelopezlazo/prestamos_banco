import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiURL = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiURL);
  }
}
