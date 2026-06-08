import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  private apiUrl = 'http://localhost:8080/api/transacoes';

  constructor(private http: HttpClient) { }

  lancar(transacao: any): Observable<any> {
    return this.http.post(this.apiUrl, transacao);
  }

  buscarPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}