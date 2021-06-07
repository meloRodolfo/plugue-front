import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path: string = 'http://127.0.0.1:8080/aluno';
  // path: string = 'https://plugue.herokuapp.com/aluno';

  //Headers
  httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
    "Content-Type": "application/json" })};

  salvaAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.path, JSON.stringify(aluno), this.httpOptions);
  }

  applyIdea(idAluno: Number, idIdeia: Number) {
    this.httpClient.put(`${this.path}/${idAluno}/projeto/${idIdeia}`, {}, this.httpOptions).subscribe(
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
