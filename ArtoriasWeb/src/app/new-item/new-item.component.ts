import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Item } from '../Objects/item';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  itemForm = new FormGroup({
    name: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
    type: new FormControl()
  });

  idSeed = "0";//VERY temporary solution for generating ID
  
  //data type is a placeholder, not sure if I wanna use it
  constructor(private dataService: DataService,public dialogRef: MatDialogRef<NewItemComponent>,  @Inject(MAT_DIALOG_DATA) public data: Item,){} 

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.dataService.user?._id && this.dataService.currentProject?._id) {
      let newItem:Item = new Item(this.idSeed+="1",
      this.itemForm.get("name")?.value,
      this.itemForm.get("status")?.value,
      this.itemForm.get("priority")?.value,
      this.itemForm.get("type")?.value,
      this.dataService.user._id,
      this.dataService.currentProject?._id,
      this.itemForm.get("description")?.value);
      console.log("Item submitted");
      this.dataService.addItem(newItem).subscribe(item => this.data = (item as Item));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
