import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario/usuario.service';
import { Usuario } from 'src/app/shared/usuario/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../assets/stylesheets/header.component.scss']
})
export class HeaderComponent implements OnInit {

  idUsuario: any = '';
  tipoSession: any = '';

  constructor(
    private usuarioService: UsuarioService,
    private route_rec: ActivatedRoute,
    private router_env: Router
  ) {
    this.idUsuario = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
   }

  usuario!: Usuario;

  ngOnInit(): void {}

  repo(){
    this.router_env.navigate(['/repositorio-de-ideias', { id: this.idUsuario, tipoUsuario: this.tipoSession}]);
  }

  dash(){
    if(this.tipoSession == 'aluno'){
      this.router_env.navigate(['/home', { id: this.idUsuario, tipoUsuario: this.tipoSession}]);
    }
    else{
      this.router_env.navigate(['/home', { id: this.idUsuario, tipoUsuario: this.tipoSession}]);
    } 
  }
}
