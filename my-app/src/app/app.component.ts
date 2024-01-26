import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  rForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.email]),

    skills: new FormArray([
      new FormGroup({
        field1: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
        field2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      })
    ])
  })

  onSubmit() {
    console.log(this.rForm.value);
    this.rForm.reset();
  }

  get data() {
    return this.rForm.controls;
  }

  onAddSkill() {
    const control = new FormGroup({
      field1: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      field2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    })
    this.rForm.controls.skills.push(control);
  }

  onRemoveSkill(index:number) {
    this.rForm.controls.skills.removeAt(index);
  }
}
