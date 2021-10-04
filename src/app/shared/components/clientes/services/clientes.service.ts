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
    return this.http.get<Cliente[]>(this.apiURL)
  }

  addClientes(cliente: any) {
    return this.http.post<any>(this.apiURL, cliente)
  }

  editCliente(cliente: any) {
    return this.http.put<any>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  detailCliente(detail: any):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/detalle`, detail)
  }
}
