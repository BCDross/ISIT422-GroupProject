import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../Objects/item';
import { MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from '../new-item/new-item.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../Objects/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<Item>;
  items: Item[] = [];//local copy of the list of items to display

  displayedColumns = ["name","status","priority","type", "edit"]; // for displaying table columns

  constructor(public dataService: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.items);
  }

  ngOnInit(): void {
    
    if (this.dataService.currentProject) {
      this.dataService.getItemsByProject().subscribe(response => {
        this.items = (response as Item[]);
        this.dataSource.data = (response as Item[]);
      });
    }
    console.log("ngOnInit called");
     //temp solution
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result); //testing
      this.dataService.getItemsByProject().subscribe(response => {
        this.items = (response as Item[]);
        this.dataSource.data = (response as Item[]);
      });
    });
  }

  openEdit(item: Item): void {
    console.log(item.name);
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '500px',
      data: item, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result); //testing
      this.dataService.getItemsByProject().subscribe(response => {
        this.items = (response as Item[]);
        this.dataSource.data = (response as Item[]);
      });
    });
  }

  //test method
  addUser() {
    let newUser = new User("fakeID", "Test", "Seven", "Test.Seven@bellevuecollege.edu", "422cdd");
    this.dataService.addUser(newUser).subscribe(user => console.log(user));
  }

}
