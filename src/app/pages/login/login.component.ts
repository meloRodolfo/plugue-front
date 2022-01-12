import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/shared/usuario/usuario';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario = new FormGroup({
    email: new FormControl(''),
    senha : new FormControl(''),
  });

  usuario!: Usuario;
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  login() {
    let email = this.formulario.get('email')?.value;
    let password = this.formulario.get('senha')?.value;
    this.userService.authenticateUser(email, password);

  }

}
