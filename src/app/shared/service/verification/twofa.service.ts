import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from 'app/shared/interface/general.interface';

@Injectable({
  providedIn: 'root'
})
export class TwofaService {

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
  ) { }

  verify(code:string,token:string){
   const body={"code":code};
   const headers= new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':'*/*',
    'Authorization':'Bearer '+token
   });

   return this.http.post([this.apiConfigService.proxyApiUrl,'api/generate/verify2famail'].join('/'),body,{headers,responseType: "json"}) as Observable<DefaultResponse>;
  }
}
