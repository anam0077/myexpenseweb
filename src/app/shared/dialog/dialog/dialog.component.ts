import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { dataDialog } from 'app/shared/interface/general.interface';
import { ExpenseService } from 'app/shared/service/expense/expense.service';
import { AccountService } from 'app/shared/service/user/account.service';
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

  payloadDetele={
    purpose:'',
    data:{
        username:'',
        password:''
    }
  };

 
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
}
