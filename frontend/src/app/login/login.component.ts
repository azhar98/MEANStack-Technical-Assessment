import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    });
  }

  loginValidation(){
    if(this.loginForm.invalid){
      this.submitted=false
      console.log('error login form')
    }else{
      this.submitted=true
      this.apiService.userLoginData(this.loginForm.value)
      .subscribe(res=>{
         console.log(res)
      //    localStorage.setItem('token_id',res._body)
        
       
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
