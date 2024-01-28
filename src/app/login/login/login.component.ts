import { Component, Inject, OnInit } from '@angular/core';
// import icJira from '@iconify/icons-logos/jira';
// import icMail from '@iconify/icons-ic/twotone-mail';
// import icAt from '@iconify/icons-fa-solid/at';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginService } from 'app/shared/service/login-service/login.service';
// import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ActivatedRoute, Router} from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { SnackbarNotifComponent } from 'app/shared/notification/snackbar-notif-component';
// import { NotificationService } from 'app/shared/notification/notification-service.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // icJira = icJira;
  // icMail = icMail;
  // icAt = icAt;

  // loginForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;

  public constructor(
    // private formBuilder: FormBuilder,
    // private loginService:LoginService,
    // @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router,
    // private route:ActivatedRoute
    // private snackBar: MatSnackBar,
    // private notifService:NotificationService
  ) { 
   
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    // });
   }

  onSubmit() {
  // this.submitted = true;
  // let status=this.loginService.Login((this.loginForm.controls?.username?.value || '').toLowerCase(),(this.loginForm.controls?.password?.value || '').toLowerCase());
  // status.subscribe(
  //   data=>{
  //     if(data){
  //       this.router.navigate(['/table-list']);
  //       // this.router.navigateByUrl("/table-list");
  //     }
  //   }
  // ) 
  this.router.navigate(['/table-list']);
      // this.router.navigateByUrl('/about')
    
  // .then(nav => {
  //     console.log("sukses "+nav); // true if navigation is successful
  //   }, err => {
  //     console.log("gagal "+err) // when there's an error
  //   });
 }

 testNotif(){
  // this.notifService.showError("err");
  // this.snackBar.openFromComponent(SnackbarNotifComponent, { data: { message: `Tier has been edited successfully`, type: 'danger' } });
  this.router.navigate(['.','about-inner']);
 }


}
