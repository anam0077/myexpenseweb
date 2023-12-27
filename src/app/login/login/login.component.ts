import { Component, OnInit } from '@angular/core';
import icJira from '@iconify/icons-logos/jira';
import icMail from '@iconify/icons-ic/twotone-mail';
import icKey from '@iconify/icons-fa-solid/user-lock';
import icAt from '@iconify/icons-fa-solid/at';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });


}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  
}

}
