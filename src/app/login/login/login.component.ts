import { Component, Inject, OnInit } from '@angular/core';
import icJira from '@iconify/icons-logos/jira';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAt from '@iconify/icons-fa-solid/at';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/shared/service/login-service/login.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  icJira = icJira;
  icMail = icMail;
  icAt = icAt;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoading:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router
  ) { 
   
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
   }

  onSubmit() {
    this.isLoading=true;
    this.submitted = true;
    this.loginService.login((this.loginForm.controls?.username?.value || '').toLowerCase(),(this.loginForm.controls?.password?.value || '').toLowerCase()).subscribe(
      data=>{
        if(data){
          this.isLoading=false;
          this.router.navigate(['/table-list']);
        }
      }
    ) 
 }
 
}
