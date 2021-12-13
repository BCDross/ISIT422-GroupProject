import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../Objects/project';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  editProjectForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  });

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<EditProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: Project) { 
    this.editProjectForm.get("name")?.setValue(data.name);
    this.editProjectForm.get("description")?.setValue(data.description);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.dataService.user?._id && this.data._id) {
      let newProject: Project = new Project(this.data._id,
        this.editProjectForm.get("name")?.value,
        this.editProjectForm.get("description")?.value);
        this.dataService.updateProject(newProject);
    }
  }

  onDelete() {
    this.dataService.deleteProject(this.data).subscribe(project => console.log(project));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
