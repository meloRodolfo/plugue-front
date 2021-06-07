import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path: string = 'http://127.0.0.1:8080/usuario';
  // path: string = 'https://plugue.herokuapp.com/usuario';

  fazerLogin(login: string, senha: string) {
  //Headers
  const headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
    "Content-Type": "application/json"
  });

  const params = new HttpParams()
      .set('login', login)
      .set('senha', senha)

    return this.httpClient.get<Usuario>(this.path, {headers, params})
  }
}
