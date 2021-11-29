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
    name: new FormControl(),
    description: new FormControl()
  });

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<NewProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: Project,){}

  ngOnInit(): void {
  }

  onSubmit() {
    let newProject:Project = new Project(this.projectForm.get("name")?.value,
    this.projectForm.get("description")?.value,
    "618e23408e40169b617b2f1e"); //Hardcoded Darren's user for testing. This will be removed for dynamic adding when we have completed he user sign in process.
    console.log("Project submitted");
    this.dataService.addProject(newProject).subscribe(project => this.data = (project as Project));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
