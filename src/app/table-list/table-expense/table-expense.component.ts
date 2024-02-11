import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { GenericExpenseResponse ,BodyExpense, Expense } from 'app/shared/interface/general.interface';
import { ExpenseService } from 'app/shared/service/expense/expense.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable, catchError, filter } from 'rxjs';

const STORAGE_KEY = 'myexpense-token';

@Component({
  selector: 'table-expense',
  templateUrl: './table-expense.component.html',
  styleUrls: ['./table-expense.component.css']
})

 export class TableExpenseComponent implements OnInit {

  expenseSubject:BehaviorSubject<GenericExpenseResponse>=new BehaviorSubject(
    null
  );  
  expenseData$:Observable<GenericExpenseResponse>=this.expenseSubject.asObservable();
  expenseResponse:GenericExpenseResponse={
    status:"", 
    message:"", 
    body:{
        searchAmount:"",
        searchRow:"",
        totalAmount:" ",
        totalRows:"",
        offsetPrev:"",
        offsetNext:"",
        itemList:[{
                    no:"",
                    client:"",
                    item:"",
                    amount:"",
                    date:"",
                  }]
    }
  };
  
  @Input() inputData:string[]=[];

  constructor(
    private expenseService:ExpenseService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.register();
    this.loadExpense(this.inputData[1],this.inputData[2],this.inputData[3]);
  }

  ngOnChanges(changes:SimpleChange){
    this.loadExpense(this.inputData[1],this.inputData[2],this.inputData[3]);
  }

  register(){
    this.expenseData$.pipe(
      filter<GenericExpenseResponse>(Boolean)
    ).subscribe(
      data=>{
       this.expenseResponse=data;
      }
    )
  }

  loadExpense(date:string, offset:string,indicator:string){
    let endUri:string='';
    let clue:string='';
    let start:string='';
    let end:string='';
    let splitStr:string[]=[];
          switch(indicator){
            case "day":{
              endUri="showtoday";
              clue='today';
              break;
            };
            case 'month':{
              endUri="showmonth"
              clue='month';
              break;
            }
            case 'year':{
              endUri="showyear"
              clue='year';
              break;
            }
            case 'all':{
              endUri="show";
              clue='';
              break;
            }
            case 'custom':{
              endUri="custom";
              clue='custom';
              splitStr=date.split("&",2);
              start=splitStr[0];
              end=splitStr[1];
              break;
            }
          }
     this.expenseService.showExpense(this.storage.get(STORAGE_KEY),date,offset,clue, start,end,endUri)
    
     .subscribe({
      next:(success)=>{
        this.expenseSubject.next(success);
      },
      error:(err)=>{
        if(err.status==401){
          this.router.navigate(['/login']);
        }
      }
    }
    )
  }

 
}
