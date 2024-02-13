import { Component, Inject, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { dataDialog } from 'app/shared/interface/general.interface';
import { ExpenseService } from 'app/shared/service/expense/expense.service';
import { AccountService } from 'app/shared/service/user/account.service';
import * as moment from 'moment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'myexpense-token';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  username:string='';
  password:string='';
  item:string='';
  price:string='';

  isDeleteAccount=false;
  isConfirmation=false;
  isCreateNewExpense=false;
  isVerboseExpense=false;

  payloadDetele={
    purpose:'',
    data:{
        username:'',
        password:''
    }
  };

  // payload expense
  payloadExpense={
    no:'',
    item:'',
    amount:'',
    date:''
  }

 
  constructor(
    public dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private accountService:AccountService,
    private expenseService:ExpenseService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ){}

  ngOnInit(): void {
    this.selection(this.data)
  }

  onChange(newValue){
   this.payloadExpense.date=moment(newValue).format('YYYY-MM-DD')
  }

  selection(dataIn:dataDialog){
    switch(dataIn.operation){
      case 'deleteAccount' :{
         this.isDeleteAccount=true;
        break;
      };
      case 'createNewExpense':{
          this.isCreateNewExpense=true;
        break;
      }
      case 'confirmation' :{
        this.isConfirmation=true;
        break;
      };
      case 'verboseExpense' :{
        this.isVerboseExpense=true;
        this.payloadExpense=this.data.payload.payload
        break;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  confirmationAction(payloadDetele){
       switch(payloadDetele.purpose){
        case 'delete':{
          this.deleteAccount(payloadDetele.data.username,payloadDetele.data.password);
          break;
        }
       }
  }


  deleteAccount(username:string, password:string){
    this.accountService.deleteAccount(this.storage.get(STORAGE_KEY),username,password).subscribe({
      next:(s)=>{
        if(s.status=='success'){
          // no message is passed
          this.dialogRef.close({"status":"success"});
        }
      },
      error:(e)=>{
          console.log(e)
      }
    })
  }


  createNewExpense(){
      this.expenseService.addNewExppense(this.storage.get(STORAGE_KEY),this.item, this.price,this.data.payload.today).subscribe(
        {
          next:(s)=>{
            console.warn( 'success'+JSON.stringify(s));

          },
          error:(e)=>{

          }
        }
      )
  }

  updateExpense(){

    this.expenseService.updateExpense(this.storage.get(STORAGE_KEY),this.payloadExpense.no, this.payloadExpense.item,this.payloadExpense.amount, this.payloadExpense.date)
    .subscribe(
      {
        next:(s)=>{
          console.warn( 'success'+JSON.stringify(s));
        },
        error:(e)=>{

        }
      }
    )
  }
}
