import { Inject, Injectable, OnInit } from "@angular/core";
import { ApiConfigService } from "../api-config.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountResponse } from "app/shared/interface/general.interface";


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

    



}