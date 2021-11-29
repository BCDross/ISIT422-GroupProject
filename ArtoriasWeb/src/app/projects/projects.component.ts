import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../Objects/project';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectComponent } from '../new-project/new-project.component';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../Objects/user';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  dataSource: MatTableDataSource<Project>;
  projects: Project[] = [];

  displayedColumns = ["name", "description"];

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.projects);
  }

  ngOnInit(): void {
    this.dataService.getAllProjects().subscribe(response => this.projects = (response as Project[]));
    this.dataService.getAllProjects().subscribe(response => this.dataSource.data = (response as Project[]));
    console.log("ngOnInit called");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: {}, //nothing here yet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result); //testing
      this.dataService.getAllProjects().subscribe(response => {
        this.projects = (response as Project[]);
        this.dataSource.data = (response as Project[]);
      });
    });
  }

}