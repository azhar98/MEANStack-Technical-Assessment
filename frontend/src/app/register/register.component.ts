import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean=false;
  constructor(private userService: UserService, 
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
    ) 
  {
         
    this.createForm();
 }

   
   createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    });
  }

  regiserValidation(){
    if(this.registerForm.invalid){
      this.submitted=false;
      console.log('registration error')
    }else{
      this.submitted=true;
      console.log(this.registerForm.value)
      this.apiService.userRegistration(this.registerForm.value).subscribe(res=>{
        console.log(res)
        this.router.navigate(['/'])
      })

    }
  }

  ngOnInit() {
  }

  fbLogin() {
    this.userService.fbLogin().then(() => {
      console.log('User has been logged in');
      this.router.navigate(['/dashboard']);
    });  }

}
