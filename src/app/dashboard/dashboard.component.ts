import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'app/shared/service/expense/expense.service';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const STORAGE_KEY = 'myexpense-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  area:string;
  highest:string;

  constructor(
    private expenseService:ExpenseService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router,
  ) { }
  
  ngOnInit() {
      this.retrieveSummaryExpense();

  }



  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};
startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
};


retrieveSummaryExpense(){

  let date: Date = new Date();
  let today=date.getFullYear()+"-"+(((date.getMonth()+1).toString().length>1)?(date.getMonth()+1).toString():'0'+(date.getMonth()+1).toString())+"-"+
  ((date.getDate().toString().length>1)?date.getDate().toString():'0'+date.getDate().toString());
 

  this.expenseService.getSummary(this.storage.get(STORAGE_KEY),"week",today)
  .subscribe(
    {
      next:(s)=>{
            this.area=moment(s.body.data[0].period,"YYYY-MM-DD").format('ll');
            this.highest=s.body.highestAmount;
            const dataDailySalesChart: any = {
                labels: [moment(s.body.data[6].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[6].period,"YYYY-MM-DD").format('DD')+')', 
                          moment(s.body.data[5].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[5].period,"YYYY-MM-DD").format('DD')+')',
                          moment(s.body.data[4].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[4].period,"YYYY-MM-DD").format('DD')+')',
                          moment(s.body.data[3].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[3].period,"YYYY-MM-DD").format('DD')+')',
                          moment(s.body.data[2].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[2].period,"YYYY-MM-DD").format('DD')+')',
                          moment(s.body.data[1].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[1].period,"YYYY-MM-DD").format('DD')+')',
                          moment(s.body.data[0].period,"YYYY-MM-DD").format('dd')+'('+moment(s.body.data[0].period,"YYYY-MM-DD").format('DD')+')'],
                series: [
                    [parseInt(s.body.data[6].amount), parseInt(s.body.data[5].amount), parseInt(s.body.data[4].amount), parseInt(s.body.data[3].amount),
                    parseInt(s.body.data[3].amount), parseInt(s.body.data[1].amount), parseInt(s.body.data[0].amount)]
                ]
            };

            const optionsDailySalesChart: any = {
                  lineSmooth: Chartist.Interpolation.cardinal({
                      tension: 0
                  }),
                  low:0 ,
                  high: parseInt(s.body.highestAmount)+100000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                  chartPadding: { top: 0, right: 0, bottom: 0, left: 30},
              }

            var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

            this.startAnimationForLineChart(dailySalesChart);
      },
      error:(e)=>{
        if(e.status==401){
          this.router.navigate(['/login']);
        }
      }
    }
  )
}


}
