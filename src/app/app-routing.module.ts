import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AtualizarIdeiaComponent } from './pages/atualizar-ideia/atualizar-ideia.component';
import { CadastrarIdeiaComponent } from './pages/cadastrar-ideia/cadastrar-ideia.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IdeiaComponent } from './pages/ideia/ideia.component';
import { LoginComponent } from './pages/login/login.component';
import { RepositorioDeIdeiasComponent } from './pages/repositorio-de-ideias/repositorio-de-ideias.component';
import { IndexComponent } from './pages/index/index.component';
import { CadastrarProjetoComponent } from './pages/cadastrar-projeto/cadastrar-projeto.component';
import { ProjetoComponent } from './pages/projeto/projeto.component';
import { AtualizarProjetoComponent } from './pages/atualizar-projeto/atualizar-projeto.component';
import { RepositorioDeProjetosComponent } from './pages/repositorio-de-projetos/repositorio-de-projetos.component';

const routes: Routes = [
  { path:"", component: IndexComponent },
  { path:"home", component: DashboardComponent },
  { path: "cadastro", component: CadastroComponent },
  { path:"login", component: LoginComponent },
  { path:"cadastrar-ideia", component: CadastrarIdeiaComponent },
  { path:"atualizar-ideia/:ideiaId", component: AtualizarIdeiaComponent },
  { path:"ideia/:ideiaId", component: IdeiaComponent },
  { path:"repositorio-de-ideias", component: RepositorioDeIdeiasComponent },
  { path:"cadastrar-projeto", component: CadastrarProjetoComponent },
  { path:"projeto/:projetoId", component: ProjetoComponent },
  { path:"atualizar-projeto/:projetoId", component: AtualizarProjetoComponent },
  { path:"repositorio-de-projetos", component: RepositorioDeProjetosComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
