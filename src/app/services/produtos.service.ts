import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  api = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<IProduto[]>(this.api);
  }

  cadastrarProduto(produto: Partial<IProduto>) {
    return this.http.post(this.api, produto)
  }

  deletarProduto(id: number) {
    return this.http.delete<IProduto>(`${this.api}/${id}`);
  }

  buscarPorId(id: number) {
    return this.http.get<IProduto>(`${this.api}/${id}`);
  }

  editarProduto(produto: Partial<IProduto>) {
    return this.http.put<IProduto>(`${this.api}`, produto);
  }

}