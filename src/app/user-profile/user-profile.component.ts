import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountResponse } from 'app/shared/interface/general.interface';
import { AccountService } from 'app/shared/service/user/account.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable, filter } from 'rxjs';


const STORAGE_KEY = 'myexpense-token';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  accountDetail:AccountResponse=null;
  accountDetailSubject:BehaviorSubject<AccountResponse>=new BehaviorSubject(null);
  accountDetailData$:Observable<AccountResponse>=this.accountDetailSubject.asObservable();
  usageData:number[]=[0,10];


  constructor(
    private accountService:AccountService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router:Router
  ) { }

  ngOnInit() {
    this.register();
    this.getAccount();
  }

  register(){
    this.accountDetailData$.pipe(
      filter<AccountResponse>(Boolean)
    ).subscribe(
      data=>{
        this.accountDetail=data;
      }
    );
  }


  getAccount(){
    this.accountService.getUserAccount(this.storage.get(STORAGE_KEY)).subscribe(
      data =>{
        this.accountDetailSubject.next(data);
      },
      err=>{
        if(err.status==401){
          this.router.navigate(['/login']);
        }
      }

    )
    
  }



}
