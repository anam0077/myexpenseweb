import { Inject, Injectable, OnInit } from "@angular/core";
import { ApiConfigService } from "../api-config.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountResponse, DefaultResponse } from "app/shared/interface/general.interface";


@Injectable({
    providedIn: 'root'
})
export class AccountService implements OnInit{


    constructor(
        private apiConfigService: ApiConfigService,
        private http: HttpClient,
    ){

    }

    ngOnInit(): void {
        
    }

    getUserAccount(token:string){
        const headers= new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept':'*/*',
            'Authorization': 'Bearer '+token
        });

        const params = new HttpParams().append('code', 'user').append('clue','account');

        return this.http.get([this.apiConfigService.proxyApiUrl,'abhgsfgapitest/index/userAccount'].join('/'),{headers,params}) as Observable<AccountResponse>;
    }

    deleteAccount(token:string,username:string,password:string){
        const headers= new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept':'*/*',
            'Authorization': 'Bearer '+token
        });

        const body = {"username":username, "password":password};

        return this.http.delete([this.apiConfigService.proxyApiUrl,'abb4568f44h77/g7789hgjt/z467hhfstcg/unregister913478'].join('/'),{body,headers}) as Observable<DefaultResponse>;
    }

    



}