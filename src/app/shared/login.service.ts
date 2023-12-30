import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiConfigService } from './service/api-config.service';
import { Observable } from 'rxjs';
import { LoginResponse } from './interface/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }


  Login(username:string, password:string){

  const body={"username":username, "password":password};
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Accept':'*/*',
   });

  return this.http.post([this.apiConfigService.proxyApiUrl, 'abb4568f44h77/g7789hgjt/z467hhfstcg/login56tty'].join('/'), body, { headers , responseType: "json"}) as Observable<LoginResponse>;
    
  }
}
