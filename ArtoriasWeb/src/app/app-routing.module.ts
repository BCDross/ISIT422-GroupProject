import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: 'projects-component', component: ProjectsComponent },
  { path: 'project-component', component: ProjectComponent },
  { path: 'list-component', component: ListComponent },
  { path: 'users-component', component: UsersComponent },
  { path: 'admin-component', component: AdminComponent },
  //{ path: '**', component: AppComponent }, //wild card route for pages not defined I.e. 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
