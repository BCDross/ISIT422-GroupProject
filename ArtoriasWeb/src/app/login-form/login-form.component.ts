import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../Objects/user';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export class LoginInfo {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  } 
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  
  //data type is a placeholder, not sure if I wanna use it
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<LoginFormComponent>,  @Inject(MAT_DIALOG_DATA) public data: User,public dialog: MatDialog){} 

  ngOnInit(): void {
  }

  onSubmit() {
    let loginInfo:LoginInfo = new LoginInfo(
      this.loginForm.get("email")?.value,
      this.loginForm.get("password")?.value)

      //temporary until there's an actual log-in route
    this.dataService.getUserByEmail(loginInfo.email).subscribe(user => {
      this.data = (user as User);
      if (this.data._id) {
        this.dataService.user = this.data;
        console.log(`${this.data.firstName} has logged in.`);
        this.dialogRef.close();
      }
      else {
        console.log("Log-in failed.");
        this.openDialog("Failed to log you in", "Please check your email and password and try again.");
      }

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',
      height: "auto",
      data: {title: title, message: message}
    });
  }
}
