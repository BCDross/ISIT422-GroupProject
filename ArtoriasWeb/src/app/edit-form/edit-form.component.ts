import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Item } from '../Objects/item';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  itemForm = new FormGroup({
    name: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
    type: new FormControl()
  });

  constructor(private dataService: DataService,public dialogRef: MatDialogRef<EditFormComponent>,  @Inject(MAT_DIALOG_DATA) public data: Item){
    this.itemForm.get("name")?.setValue(data.name);
    this.itemForm.get("status")?.setValue(data.status);
    this.itemForm.get("priority")?.setValue(data.priority);
    this.itemForm.get("description")?.setValue(data.description);
    this.itemForm.get("type")?.setValue(data.type);
  } 

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.dataService.user?._id && this.dataService.currentProject?._id) {
      let newItem:Item = new Item(this.data._id,
      this.itemForm.get("name")?.value,
      this.itemForm.get("status")?.value,
      this.itemForm.get("priority")?.value,
      this.itemForm.get("type")?.value,
      this.dataService.user._id,
      this.dataService.currentProject?._id,
      this.itemForm.get("description")?.value);
      this.dataService.updateItem(newItem);//.subscribe(item => this.data = (item as Item));
    }
  }

  onDelete() {
    this.dataService.deleteItem(this.data).subscribe(item => console.log(item));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
