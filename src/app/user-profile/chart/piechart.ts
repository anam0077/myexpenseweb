import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Component({
  selector: 'piechart',
  templateUrl: './piechart.html'
})
export class PieChartComponent implements OnInit,OnChanges {

  @Input() usage=null;

  // Pie
  pieChartLabels: string[] = ['Usage', 'Max Capacity'];
  pieChartData: number[] = [];
  pieChartType: string = 'pie';

  inputSubject:BehaviorSubject<Number>=new BehaviorSubject(null);
  inputData$:Observable<Number>=this.inputSubject.asObservable();

  ngOnInit(): void {
   this.register();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputSubject.next(this.usage)
  }

  

  register(){
    this.inputData$.pipe(
      filter<number>(Boolean)
    ).subscribe(
      data=>{
        this.pieChartData=[data,100-data]
      }
    );
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}