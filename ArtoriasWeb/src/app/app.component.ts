import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ArtoriasWeb';
  constructor(public dataService: DataService, public dialog: MatDialog, private router: Router) {

  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.router.navigateByUrl("/projects");
    });
  }

  openRegistration() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });
  }

  createNewProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addCard(){}
}
