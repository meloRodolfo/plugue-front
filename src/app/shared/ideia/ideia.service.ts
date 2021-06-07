import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ideia } from './ideia';

@Injectable({
  providedIn: 'root'
})
export class IdeiaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path: string = 'http://127.0.0.1:8080/ideia';
  // path: string = 'https://plugue.herokuapp.com/ideia';
  result!: Array<Ideia>

  //Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      "Content-Type": "application/json"
    })
  };

  salvaIdeia(ideia: Ideia): Observable<Ideia> {
    return this.httpClient.post<Ideia>(this.path, JSON.stringify(ideia), this.httpOptions);
  }

  //Lista todas as ideias
  listarIdeias() {
    return this.httpClient.get<Array<Ideia>>(this.path);
  }

  //Busca ideias por parâmetros
  buscarIdeias(titulo: string, area: string) {
    const headers = this.httpOptions.headers

    let params = new HttpParams();
    if (titulo) params = params.append('titulo', titulo);
    if (area) params = params.append('areaInteresse', area);
    console.log(params);

    return this.httpClient.get(`${this.path}`, { headers, params }).toPromise()
  }

  // Interessar por ideia
  // applyIdea() {
  //   const headers = this.httpOptions.headers

  //   this.httpClient.put(`${this.path}/${"teste"}/ideia/${"38"}`, {}, { headers }).subscribe(
  //     val => {
  //       console.log("PUT call successful value returned in body", val);
  //     },
  //     response => {
  //       console.log("PUT call in error", response);
  //     },
  //     () => {
  //       console.log("The PUT observable is now completed.");
  //     }
  //   );
  // }

  getIdeia(id: String) {
    const headers = this.httpOptions.headers;
    return this.httpClient.get(`${this.path}/${id}`, { headers }).toPromise();
  }

  deletarIdeia(id: String) {
    const headers = this.httpOptions.headers;
    return this.httpClient.delete(`${this.path}/${id}`, { headers }).toPromise();
  }

  atualizarIdeia(id: String, ideia: Ideia) {
    const headers = this.httpOptions.headers;
    return this.httpClient.put(`${this.path}/${id}`, ideia, { headers }).subscribe(
      val => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );
  }
  
}
