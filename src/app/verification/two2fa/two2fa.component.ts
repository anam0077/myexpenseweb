import { Component, Inject, OnInit } from '@angular/core';
import icJira from '@iconify/icons-logos/jira';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAt from '@iconify/icons-fa-solid/at';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { TwofaService } from 'app/shared/service/verification/twofa.service';

const STORAGE_KEY = 'myexpense-token';

@Component({
  selector: 'two2fa',
  templateUrl: './two2fa.component.html',
  styleUrls: ['./two2fa.component.css']
})
export class Two2faComponent implements OnInit{

  icJira = icJira;
  icMail = icMail;
  icAt = icAt;

  verificationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoading:boolean=false;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private twofaService:TwofaService
  ){

  }

  ngOnInit(): void {
    this.verificationForm=this.formBuilder.group({
      code:['', Validators.required]
    })
  }

  onSubmit(){
    this.isLoading=true;
    this.twofaService.verify((this.verificationForm.controls?.code?.value || '').toLowerCase(),this.storage.get(STORAGE_KEY))
    .subscribe(
      {
        next:(data)=>{
            console.log("verify response status "+JSON.stringify(data))
            if(data.status=="success"){
              this.router.navigate(['/table-list']);
            }
        },
        error:(e)=>{

            console.log(e);
            if(e.status==401){
              this.router.navigate(['/login']);
            }
        }
      }
    )
  }

  


}
