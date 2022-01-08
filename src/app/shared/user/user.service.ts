import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import AWSconfig from '../../../../src/aws-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { 
    Amplify.configure(AWSconfig);
    Auth.configure(AWSconfig);
  }

  path: string = 'https://juf7nz7sri.execute-api.us-east-1.amazonaws.com/dev/user'

  // httpOptions = { headers: new HttpHeaders({
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  //   "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
  //   "Content-Type": "application/json"
  // })};

  async createUser(user: any) {
    try {
      // await Auth.signUp(user.email , user.password);
      this.httpClient.post<any>(this.path, JSON.stringify(user)).subscribe(
        val => {
          console.log("Cadastro efetuado com sucesso", val);
        },
        response => {
            console.log("Erro na realização do cadastro", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        }
      );
    } catch (err) {
      console.log('Erro no cadastro do usuário: ', err);
    }
  }
}
