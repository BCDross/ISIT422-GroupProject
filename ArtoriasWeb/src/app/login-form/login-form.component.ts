import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../Objects/user';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    password: new FormControl(),
  });
  
  //data type is a placeholder, not sure if I wanna use it
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<LoginFormComponent>,  @Inject(MAT_DIALOG_DATA) public data: User,){} 

  ngOnInit(): void {
  }

  onSubmit() {
    let loginInfo:LoginInfo = new LoginInfo(
      this.loginForm.get("email")?.value,
      this.loginForm.get("password")?.value)

      //temporary until there's an actual log-in route
    this.dataService.getUserByEmail(loginInfo.email).subscribe(user => {
      this.data = (user as User);
      console.log(this.data.firstName + " has logged in");
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
