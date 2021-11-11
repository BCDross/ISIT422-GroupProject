import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../Objects/item';
import {MatDialog} from '@angular/material/dialog';
import { NewItemComponent } from '../new-item/new-item.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<Item>;
  items: Item[] = [];//local copy of the list of items to display

  displayedColumns = ["name","status","priority","type"]; // for displaying table columns

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.items);
  }

  ngOnInit(): void {
    this.items = this.dataService.getItems();
    this.dataSource.data = this.items;
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
      this.dataSource.data = this.items;
    });
  }

}
