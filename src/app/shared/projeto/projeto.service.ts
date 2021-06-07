import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projeto } from './projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path: string = 'http://127.0.0.1:8080/projeto';
  // path: string = 'https://plugue.herokuapp.com/projeto';
  result!: Array<Projeto>

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      "Content-Type": "application/json"
    })
  };

  listarProjetos() {
    const headers = this.httpOptions.headers;
    return this.httpClient.get(`${this.path}`, { headers }).toPromise();
  }

  buscarProjetos(titulo: string, area: string) {
    const headers = this.httpOptions.headers

    let params = new HttpParams();
    if (titulo) params = params.append('titulo', titulo);
    if (area) params = params.append('areaInteresse', area);
    console.log(params);

    return this.httpClient.get(`${this.path}`, { headers, params }).toPromise()
  }
  
  salvaProjeto(projeto: Projeto): Observable<Projeto> {
    return this.httpClient.post<Projeto>(this.path, projeto, this.httpOptions);
  }

  getProjeto(id: String) {
    const headers = this.httpOptions.headers;
    return this.httpClient.get(`${this.path}/${id}`, { headers }).toPromise();
  }

  deletarProjeto(id: String) {
    const headers = this.httpOptions.headers;
    return this.httpClient.delete(`${this.path}/${id}`, { headers }).toPromise();
  }

  atualizarProjeto(id: String, projeto: Projeto) {
    const headers = this.httpOptions.headers;
    console.log(projeto)
    this.httpClient.put(`${this.path}/${id}`, projeto, { headers }).subscribe(
      val => {
        console.log("PUT call successful value returned in body", val);
        return val
      },
      response => {
        console.log("PUT call in error", response);
        return response
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );
  }
}
