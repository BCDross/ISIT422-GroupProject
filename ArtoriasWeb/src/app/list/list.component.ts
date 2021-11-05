import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { Item } from '../Objects/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  name = new FormControl('');
  status = new FormControl('');
  priority = new FormControl('');
  description = new FormControl('');
  type = new FormControl('');

  items: Item[] = []//local copy of the list of items to display
  idSeed = 0;//VERY temporary solution for generating IDs

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.items = this.dataService.getItems(); //temp solution
  }

  onSubmit() {
    let newItem:Item = new Item(this.idSeed+1,this.name.value,this.status.value,this.priority.value,this.type.value, this.description.value);

    this.dataService.addItem(newItem);

    this.items = this.dataService.getItems();

  }

}
