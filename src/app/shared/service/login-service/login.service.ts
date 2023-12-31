import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiConfigService } from '../api-config.service';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { LoginResponse, Credential } from '../../interface/general.interface';
import { AuthService } from '../auth/auth.service';

const STORAGE_KEY = 'myexpense-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  statusSubject:BehaviorSubject<boolean>=new BehaviorSubject(false);  
  statusData$:Observable<Boolean>=this.statusSubject.asObservable();
  status:Boolean=false;
  ret:Observable<LoginResponse>;
  credential:Credential={clientId:"",clientSecret:""};

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
    private authService:AuthService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  ngOnInit(): void {
        
  }

  register(){
    this.statusData$.pipe(
      filter<Boolean>(Boolean)
    ).subscribe(
      data=>{
       this.status=data;
      }
    )
  }


  Login(username:string, password:string):Observable<Boolean>{
        const body={"username":username, "password":password};
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Accept':'*/*',
        });
          this.ret= this.http.post([this.apiConfigService.proxyApiUrl, 'abb4568f44h77/g7789hgjt/z467hhfstcg/login56tty'].join('/'), body, { headers , responseType: "json"}) as Observable<LoginResponse>;
          this.ret.subscribe(
            // login success
            success =>{
              this.credential.clientId=success.payload.clientId;
              this.credential.clientSecret=success.payload.clientSecret;
              this.authService.generateToken(this.credential).subscribe(
                // generate token success
                success=>{
                  // store token
                  this.storage.set(STORAGE_KEY,success.token);
                  this.statusSubject.next(true);
                }
              )  
        });
    return this.statusData$;
  }
}
