import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeiaService } from 'src/app/shared/ideia/ideia.service';

@Component({
  selector: 'app-ideia',
  templateUrl: './ideia.component.html',
  styleUrls: ['./ideia.component.css']
})
export class IdeiaComponent implements OnInit {
  id: string
  titulo : any;
  descricao: any;
  areaInteresse: any;
  interessados: any;
  criador: number;
  idSession: any = '';
  tipoSession: any = '';

  constructor(route: ActivatedRoute, private ideiaService: IdeiaService, private router: Router) { 
    this.id = route.snapshot.params.ideiaId;
    this.titulo = '';
    this.descricao = '';
    this.areaInteresse = '';
    this.interessados = [];
    this.criador = 0;
    this.idSession = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void {
    this.getIdeia();
  }

  getIdeia() {
    this.ideiaService.getIdeia(this.id).then(({ idea }) => {
      const objectArray = Object.entries(idea);

      objectArray.forEach(([ key, value ]) => {
        console.log(key, "#######", value)
        if(key === 'title') this.titulo = value;
        if(key === 'area_of_interest') this.areaInteresse = value;
        if(key === 'description') this.descricao = value;
        if(key === 'users') this.interessados = value;
        // if(key === 'aluno') this.criador = value.id;
      })
    });

    console.log('variavel de seção ideia =',this.idSession);
  }

  deletarIdeia() {
    this.ideiaService.deletarIdeia(this.id);
    this.router.navigate(['/repositorio-de-ideias', { id: this.idSession, tipoUsuario: this.tipoSession}]);
  }

  atualizarIdeia() {
    this.router.navigate([`/atualizar-ideia/${this.id}`,  { 
      titulo: this.titulo, 
      descricao: this.descricao, 
      area: this.areaInteresse,
      criador: this.criador,
      interessados: this.interessados
    }]);
  }

}
