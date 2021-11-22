import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Project } from '../Objects/project';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projectForm = new FormGroup({
    name: new FormControl()
  });

  idSeed = "0";//VERY temporary solution for generating ID

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<NewProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: Project,) {}

  ngOnInit(): void {
  }

  onSubmit() {
    let newProject:Project = new Project(this.idSeed+="1",
    this.projectForm.get("name")?.value,
    "fakeID");
    console.log("Project submitted");
    this.dataService.addProject(newProject).subscribe(project => this.data = (project as Project));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
