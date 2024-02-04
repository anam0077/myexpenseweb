import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'piechart',
  templateUrl: './piechart.html'
})
export class PieChartComponent {

  @Input() usage: number=0;

  // Pie
  pieChartLabels:string[] = ['Usage', 'Max Capacity'];
  pieChartData:number[] = [70,30];
  pieChartType:string='pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}