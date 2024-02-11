import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import icSearch from '@iconify/icons-ic/baseline-search';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/dialog/dialog/dialog.component';

declare var require: any;
const moment = require('moment');

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  constructor(
    public dialog:MatDialog
  ) { }

  today:string='';
  thisMonth:string='';
  thisYear:string='';
  icSearch=icSearch;


  dateRangeSubject:BehaviorSubject<string>=new BehaviorSubject(null);  
  dateRangeData$:Observable<string>=this.dateRangeSubject.asObservable();
  dateRange:string='';
  

  // date picker 
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  ngOnInit() {
    this.getDate();
    this.resgisterData();
  }


  resgisterData(){
    this.dateRangeData$.pipe(
      filter<string>(Boolean)
    ).subscribe(
      data=>{
       this.dateRange=data;
      }
    )
  }

  getDate(){
    let date: Date = new Date();
    this.today=date.getFullYear()+"-"+(((date.getMonth()+1).toString().length>1)?(date.getMonth()+1).toString():'0'+(date.getMonth()+1).toString())+"-"+
    ((date.getDate().toString().length>1)?date.getDate().toString():'0'+date.getDate().toString());
    this.thisMonth=date.getFullYear()+"-"+(((date.getMonth()+1).toString().length>1)?(date.getMonth()+1).toString():'0'+(date.getMonth()+1).toString());
    this.thisYear=date.getFullYear()+"";
  }

  trigger(){
    this.dateRangeSubject.next(moment(this.range.value.start).format('YYYY-MM-DD')+'&'+moment(this.range.value.end).format('YYYY-MM-DD'));
  }


  addNewExpense():void{
    const dialofRef=this.dialog.open(DialogComponent,{
      data:{operation:"createNewExpense", payload:{today:this.today}} || null
    });

    dialofRef.afterClosed().subscribe({
      next:(s)=>{

      },
      error:(e)=>{

      }
    })
  }

}
