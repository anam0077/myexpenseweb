import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import icJira from '@iconify/icons-logos/jira';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAt from '@iconify/icons-fa-solid/at';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
