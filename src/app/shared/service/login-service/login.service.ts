import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiConfigService } from '../api-config.service';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { LoginResponse, Credential } from '../../interface/general.interface';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

const STORAGE_KEY = 'myexpense-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  statusSubject:BehaviorSubject<boolean>=new BehaviorSubject(false);  
  statusData$:Observable<boolean>=this.statusSubject.asObservable();
  ret:Observable<LoginResponse>;
  status:boolean;
  credential:Credential={clientId:"",clientSecret:""};

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
    private authService:AuthService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
        
  }

  register(){
    this.statusData$.pipe(
      filter<boolean>(Boolean)
    ).subscribe(
      data=>{
       this.status=data;
      }
    )
  }


  login(username:string, password:string):Observable<boolean>{
        const body={"username":username, "password":password};
        const headers = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Accept':'*/*',
        });

        let isYExist=[];
          this.ret= this.http.post([this.apiConfigService.proxyApiUrl, 'abb4568f44h77/g7789hgjt/z467hhfstcg/login56tty'].join('/'), body, { headers , responseType: "json"}) as Observable<LoginResponse>;
          this.ret.subscribe(
            // login success
            {
              next:(data)=>{
                            // get Y value 
                             isYExist=data.properties.filter((a)=>a=="Y");
                            this.credential.clientId=data.payload.clientId;
                            this.credential.clientSecret=data.payload.clientSecret;
                            this.authService.generateToken(this.credential).subscribe(
                              {
                                // generate token success
                                next:(data)=>{
                                              this.storage.set(STORAGE_KEY,data.token);
                                              this.statusSubject.next(true);
                                              // check value of properties whether exist 'Y' as mark of verified
                                              if(isYExist[0]!="Y"){
                                                this.router.navigate(['/verification/2fa']);
                                              }
                                },
                                error:(e)=>{
                                              this.statusSubject.next(false);
                                }
                              }
                            )  
              },
              error:(e)=>{
                this.statusSubject.next(false);
              }
            }   
        );
    return this.statusData$;
  }
}
