import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../Objects/project';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../Objects/user';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  dataSource: MatTableDataSource<Project>;
  projects: Project[] = [];
  currentUser?: User;

  displayedColumns = ["name", "description"];

  constructor(public dataService: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.projects);
  }

  ngOnInit(): void {
    this.refresh();
    console.log("ngOnInit called");
  }

  ngDoCheck(): void {
    if (this.dataService.user != this.currentUser) {
      this.currentUser = this.dataService.user;
      this.refresh();
    }
  }

  refresh(): void {
    if (this.dataService.user){
      try
      {      
        this.dataService.getProjectsByUserId().subscribe(response => this.projects = (response as Project[]));
        this.dataService.getProjectsByUserId().subscribe(response => this.dataSource.data = (response as Project[]));
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result); //testing
      if (this.dataService.user){
        this.refresh();
      }
    });
  }

  openEdit(project: Project): void {
    console.log(project.name);
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '500px',
      data: project, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result); //testing
      this.dataService.getItemsByProject().subscribe(response => {
        this.projects = (response as Project[]);
        this.dataSource.data = (response as Project[]);
      });
    });
  }
}