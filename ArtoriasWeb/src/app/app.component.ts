import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ArtoriasWeb';
  constructor(private dataService: DataService, public dialog: MatDialog) {

  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });
  }

  openRegistration() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });
  }

  addCard(){}
}
