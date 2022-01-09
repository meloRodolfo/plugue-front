import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import AWSconfig from '../../../../src/aws-config';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 
    Amplify.configure(AWSconfig);
    Auth.configure(AWSconfig);
  }

  path: string = 'https://juf7nz7sri.execute-api.us-east-1.amazonaws.com/dev/user'

  async createUser(user: any) {
    try {
      const { userSub } = await Auth.signUp(user.email , user.password);

      user.id = userSub;

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

      this.router.navigate(['/home', { id: userSub }]);
    } catch (err) {
      console.log('Erro no cadastro do usuário: ', err);
    }
  }

  async authenticateUser (email: string, password: string) {
    try {
      const { user } = await Auth.signIn(email, password);
      console.log("Usuário autenticado com sucesso ", user);
    } catch (err) {
      console.log('Erro na autenticação do usuário: ', err);
    }
  }
}
