import { Component, OnInit,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Item } from '../Objects/item';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  name = new FormControl();
  status = new FormControl();
  priority = new FormControl();
  description = new FormControl();
  type = new FormControl();

  // items: Item[] = []//local copy of the list of items to display
  idSeed = 0;//VERY temporary solution for generating ID
  
  //                                                                                         data type is a placeholder, not sure if I wanna use it
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<NewItemComponent>,  @Inject(MAT_DIALOG_DATA) public data: Item,){} 

  ngOnInit(): void {
    // this.items = this.dataService.getItems(); //temp solution
  }

  onSubmit() {
    let newItem:Item = new Item(this.idSeed+1,this.name.value,this.status.value,this.priority.value,this.type.value, this.description.value);

    this.dataService.addItem(newItem);

    // this.items = this.dataService.getItems();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
