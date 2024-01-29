import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  rForm:any;
  userSubcription!:Subscription;
  userData:any;
  currentId:any;
  editMode:boolean = false;

  constructor(private apiSerice:AppService) { }

  ngOnInit(): void {
    this.rForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.email]),
  
      skills: new FormArray([
        new FormGroup({
          field1: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
          field2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        })
      ])
    })

    if(this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
    this.userSubcription = this.apiSerice.getAllData().subscribe((response)=>{
      this.userData = response;
    })
  }

  onSubmit() {
    if (!this.editMode) {
      if (this.userSubcription) {
        this.userSubcription.unsubscribe();
      }
      this.userSubcription = this.apiSerice.saveData(this.rForm.value).subscribe((response) => {
        console.log(response);
      })
    } else {
      if (this.userSubcription) {
        this.userSubcription.unsubscribe();
      }
      this.userSubcription = this.apiSerice.updateData(this.rForm.value, this.currentId).subscribe((response) => {
        console.log(response);
      })
      this.editMode = false;
    }
    this.rForm.reset();
    this.ngOnInit();
  }

  onEdit(id:any) {
    this.currentId = id;
    const currentUser = this.userData.find((element:any)=> element.id == id);
    this.rForm.setValue({
      name:currentUser.name,
      age:currentUser.age,
      email:currentUser.email,
      skills:[
        {
          field1:currentUser.skills[0].field1,
          field2:currentUser.skills[0].field2,
        }
      ]
    })
    this.editMode = true;
  }

  onRemove(id:any) {
    if(this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
    this.userSubcription = this.apiSerice.removeData(id).subscribe((response)=> {
      console.log(response);
    })
    this.ngOnInit();
  }

  get data() {
    return this.rForm.controls;
  }

  onAddSkill() {
    const control = new FormGroup({
      field1: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      field2: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    })
    this.rForm.controls.skills.push(control);
  }

  onRemoveSkill(index:number) {
    this.rForm.controls.skills.removeAt(index);
  }
}
