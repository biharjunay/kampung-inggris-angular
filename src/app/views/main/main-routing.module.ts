import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProgramComponent } from "./pages/program/program.component";
import { ArticleComponent } from "./pages/article/article.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'program/:id',
        component: ProgramComponent
      },
      {
        path: 'article',
        component: ArticleComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
