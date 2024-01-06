import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { GenericExpenseResponse } from 'app/shared/interface/general.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
    private authService:AuthService
  ) { }


  showExpense(token:string,date:string,offset:string,clue:string,start:string,end:string, endUri:string){
  
        const params = new HttpParams()
        .set('code', 'expense')
        .set('clue', clue)
        .set('date', date)
        .set('offset',offset)
        .set('start',start)
        .set('end',end)

        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Accept':'*/*',
          'Authorization': 'Bearer '+token
        });
        return this.http.get([this.apiConfigService.proxyApiUrl, 'abhgsfgapitest/index',endUri].join('/'), {headers, params}) as Observable<GenericExpenseResponse>;
  }
}
