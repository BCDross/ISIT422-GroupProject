import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../Objects/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    title: new FormControl()
  });
  
  //data type is a placeholder, not sure if I wanna use it
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<NewUserComponent>,  @Inject(MAT_DIALOG_DATA) public data: User, public dialog: MatDialog){} 

  ngOnInit(): void {
  }

  onSubmit() {
    let newUser:User = new User(
      this.userForm.get("firstName")?.value,
      this.userForm.get("lastName")?.value,
      this.userForm.get("email")?.value,
      this.userForm.get("password")?.value,
      this.userForm.get("title")?.value
    );
    console.log("User submitted");
    this.dataService.addUser(newUser).subscribe(user => {
      this.data = (user as User)
      if (this.data._id) {
        this.openDialog(`Welcome, ${this.data.firstName}!`, "Your account has been created, and you can now log in.");
      }
      else {
        this.openDialog("Something went wrong!", "Oh god how did this get here I am not good with computer");
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
