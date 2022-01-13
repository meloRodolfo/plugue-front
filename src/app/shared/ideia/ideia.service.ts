import { HttpClient, HttpParams } from '@angular/common/http';
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

  path: string = 'https://juf7nz7sri.execute-api.us-east-1.amazonaws.com/dev/idea';
  result!: Array<Ideia>

  salvaIdeia(ideia: Ideia): Promise<Object|any> {
    console.log(JSON.stringify(ideia))
    return this.httpClient.post<Ideia>(this.path, JSON.stringify(ideia)).toPromise();
  }

  //Lista todas as ideias
  listarIdeias(id: string) {
    return this.httpClient.get<Array<any>>(`${this.path}?userId=${id}`);
  }

  buscarIdeiasPorAutor(author: string) {
    return this.httpClient.get<Array<any>>(`${this.path}?userId=${author}`);
  }

  //Busca ideias por parâmetros
  buscarIdeias(titulo: string, area: string, autor: string, user: string) {
    let params = new HttpParams();
    if (titulo) params = params.append('title', titulo);
    if (area) params = params.append('area_of_interest', area);
    if (autor) params = params.append('author', autor);

    params = params.append('userId', user);

    return this.httpClient.get(`${this.path}`, { params }).toPromise()
  }

  getIdeia(id: String): Promise<Object|any> {
    return this.httpClient.get(`${this.path}/${id}`).toPromise();
  }

  deletarIdeia(id: String) {
    return this.httpClient.delete(`${this.path}/${id}`).toPromise();
  }

  atualizarIdeia(id: String, ideia: Ideia): Promise<Object|any> {
    return this.httpClient.post(`${this.path}/${id}`, JSON.stringify(ideia)).toPromise().then(
      val => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      }
    );
  }
  
}
