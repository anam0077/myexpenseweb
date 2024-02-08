import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import icJira from '@iconify/icons-logos/jira';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAt from '@iconify/icons-fa-solid/at';
import { Router } from '@angular/router';
import { RegisterService } from 'app/shared/service/register/register.service';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  icJira = icJira;
  icMail = icMail;
  icAt = icAt;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        email:['',Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required]
    });


}

onSubmit() {
  this.submitted = true;

  this.registerService.register(this.registerForm.controls?.email?.value, this.registerForm.controls?.username?.value, this.registerForm.controls?.password?.value)
  .subscribe(
    {
      next:(data)=>{
        if(data.status=="success"){
          this.router.navigate(['/login']);
        }
      },
      error:(e)=>console.log(e)
    }
  )
    
}
  

}
