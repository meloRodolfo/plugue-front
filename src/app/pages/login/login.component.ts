import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/usuario/usuario.service';
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
    private usuarioService: UsuarioService,
    private userService: UserService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  login() {
    // this.usuarioService.fazerLogin(this.formulario.get('email')?.value, this.formulario.get('senha')?.value).subscribe( usr => {
    //   this.usuario = usr;
    //   if(this.formulario.get('email')?.value == this.usuario.contato && this.formulario.get('senha')?.value == this.usuario.senha){
    //     this.router.navigate(['/home', { id: this.usuario.id, tipoUsuario: this.usuario.tipoUsuario}])
    //   }
    // });
    let email = this.formulario.get('email')?.value;
    let password = this.formulario.get('senha')?.value;
    this.userService.authenticateUser(email, password);

  }

}
