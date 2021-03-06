import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { BoardComponent } from './board/board.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //{ path: 'home-component', component: AppComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'board', component: BoardComponent },
  { path: 'list', component: ListComponent },
  { path: 'users', component: UsersComponent },
  { path: 'admin', component: AdminComponent },
  //{ path: '**', component: PageNotFoundComponent }, //wild card route for pages not defined I.e. 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
