import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from './professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path: string = 'http://127.0.0.1:8080/professor';
  // path: string = 'https://plugue.herokuapp.com/professor';

  //Headers
  httpOptions = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
    "Content-Type": "application/json" })};

  buscaProfessor(id: Number): Observable<Professor> {
    return this.httpClient.get<Professor>(this.path + '/' + id);
  }

  salvaProfessor(professor: Professor): Observable<Professor> {
    return this.httpClient.post<Professor>(this.path, JSON.stringify(professor), this.httpOptions);
  }

  applyIdea(idProfessor: Number, idIdeia: Number) {
    this.httpClient.put(`${this.path}/${idProfessor}/ideia/${idIdeia}`, {}, this.httpOptions).subscribe(
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
