import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Item } from '../Objects/item';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from '../new-item/new-item.component';

@Component({
  selector: 'app-project',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  items: Item[] = [];

  newItems: Item[] = [];
  activeItems: Item[] = [];
  resolvedItems: Item[] = [];
  closedItems: Item[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dataService.getAllItems().subscribe(response => {
      this.items = (response as Item[]);
      this.sortItems();
      console.log("Items received");
    });
  }

  ngOnInit(): void {
  }

  sortItems() {
    for (const item of this.items) {
      switch(item.status) {
        case "New":
          this.newItems.push(item);
          break;
        case "Active":
          this.activeItems.push(item);
          break;
        case "Resolved":
          this.resolvedItems.push(item);
          break;
        case "Closed":
          this.closedItems.push(item);
          break;
      }
    }
    // console.log(this.items);
    // console.log(this.newItems);
    // console.log(this.activeItems);
    // console.log(this.resolvedItems);
    // console.log(this.closedItems);
  }

  drop(event: CdkDragDrop<Item[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.data[event.previousIndex].status = status;
      this.dataService.updateItem(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result); //testing
      this.dataService.getAllItems().subscribe(response => {
        this.items = (response as Item[]);
        this.sortItems();
      });
    });
  }

}
