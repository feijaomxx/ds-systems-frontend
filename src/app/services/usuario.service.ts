import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // O endereço onde o seu Spring Boot está rodando
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Função que envia o objeto usuário para o Java
  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}