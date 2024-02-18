import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/shared/dialog/dialog/dialog.component';
import { AccountResponse} from 'app/shared/interface/general.interface';
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
  usageData:number=null;
  

  constructor(
    private accountService:AccountService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router:Router,
    public dialog:MatDialog,
    private _snackBar: MatSnackBar
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
        this.usageData=Math.ceil((parseInt(data.storage_size.current)/data.storage_size.max)*100);
      }
    );
  }


  getAccount(){
    this.accountService.getUserAccount(this.storage.get(STORAGE_KEY)).subscribe(
      {
        next:(data)=>{
              this.accountDetailSubject.next(data);
        },
        error:(e)=>{
          if(e.status==401){
            this.router.navigate(['/login']);
          }
        }
      }
    )
    
  }

  deleteAccount():void{
    const dialofRef=this.dialog.open(DialogComponent,{
      data:{operation:"deleteAccount", payload:""} || null
    });

    dialofRef.afterClosed().subscribe(
      {
        next:(data)=>{
            switch(data.operation){
              case 'confirmation':{
                    const dialofRef=this.dialog.open(DialogComponent,{
                      data:data|| null
                    });

                    dialofRef.afterClosed().subscribe(
                        {
                          next:(s)=>{
                                if(s.status=="success"){
                                      this._snackBar.open("account is successfully deleted","success")
                                      this.router.navigate(['/login']);
                                }
                          },
                          error:(e)=>{
                            this._snackBar.open("failed to delete account","warning")
                            console.error(e);
                          }
                        } 
                    )

                break;
              };
              default:

            }
        },
        error:(e)=>{

        }
      }
    )
  }



}
