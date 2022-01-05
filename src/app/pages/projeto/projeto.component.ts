import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/shared/projeto/projeto.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {
  id: string 
  descricao: String
  areaInteresse: String
  interessados: Array<any>
  titulo: String
  criador: number
  idSession: any = '';
  tipoSession: any = '';

  constructor(route: ActivatedRoute, private projetoService: ProjetoService, private router: Router) {
    this.id = route.snapshot.params.projetoId;
    this.descricao = "descricao"
    this.areaInteresse = "area"
    this.interessados =  []
    this.titulo = "titulo"
    this.criador = 0
    this.idSession = sessionStorage.getItem("id");
    this.tipoSession = sessionStorage.getItem("tipo");
  }

  ngOnInit(): void {
    this.getProjeto();
  }

  getProjeto() {
    this.projetoService.getProjeto(this.id).then(projeto => {
      const objectArray = Object.entries(projeto);
      objectArray.forEach(([ key, value ]) => {
        console.log(key, value)
        if(key === 'titulo') this.titulo = value;
        if(key === 'areaInteresse') this.areaInteresse = value;
        if(key === 'descricao') this.descricao = value;
        if(key === 'alunos') this.interessados = value;
        if(key === 'professor') this.criador = value.id;
      })
    })
  }

  deletarProjeto() {
    this.projetoService.deletarProjeto(this.id);
  }

  atualizarProjeto() {
    this.router.navigate([`/atualizar-projeto/${this.id}`,  { 
      titulo: this.titulo, 
      descricao: this.descricao, 
      area: this.areaInteresse,
      criador: this.criador,
      interessados: this.interessados
    }]);
  }
}
