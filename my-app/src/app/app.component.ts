import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  rForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
    age: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    email: new FormControl('',[Validators.required,Validators.minLength(1),Validators.email])
  })

  onSubmit() {
    console.log(this.rForm.controls.name.value);
    console.log(this.rForm.controls.age.value);
    console.log(this.rForm.controls.email.value);
    console.log(this.rForm.controls);
  }

  get data() {
    return this.rForm.controls;
  }
}
