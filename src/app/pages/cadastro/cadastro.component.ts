import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { UserService } from 'src/app/shared/user/user.service';
// import AWSconfig from '../../../../src/aws-config';
// import { UserService } from 'src/app/shared/user/user.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  isAluno: boolean = false;
  isProfessor: boolean = true;

  formulario = new FormGroup({
    nome: new FormControl(''),
    paginaPessoal: new FormControl(''),
    curso: new FormControl(''),
    email: new FormControl(''),
    senha : new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  changeUserType() {
    this.isAluno = !this.isAluno;
    this.isProfessor = !this.isProfessor;
  }

  onSubmit() {
    this.isProfessor == true ? this.formProfessor() : this.formAluno();
  }

  async formAluno() {

    let user: any = {emai: '', password: '', type: '', info:{name:'', course:''}};
    user.email = this.formulario.get("email")?.value;
    user.password = this.formulario.get("senha")?.value;
    user.type = 'aluno';

    user.info.name = this.formulario.get("nome")?.value;
    user.info.course = this.formulario.get("curso")?.value;

    this.userService.createUser(user)
  }

  formProfessor() {

    let user: any = {emai: '', password: '', type: '', info:{name:'', personalPage:''}};
    user.email = this.formulario.get("email")?.value;
    user.password = this.formulario.get("senha")?.value;
    user.type = 'professor';

    user.info.name = this.formulario.get("nome")?.value;
    user.info.personalPage = this.formulario.get("paginaPessoal")?.value;

    this.userService.createUser(user)
  }

}
