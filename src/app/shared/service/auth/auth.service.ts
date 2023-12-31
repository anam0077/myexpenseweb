import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token, Credential} from 'app/shared/interface/general.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiConfigService: ApiConfigService,
    private http: HttpClient,
  ) { }

  generateToken(credential:Credential){
  const body={"clientId":credential.clientId, "clientSecret":credential.clientSecret};
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Accept':'*/*',
   });
    return this.http.post([this.apiConfigService.proxyApiUrl, 'api/generate/oauth'].join('/'), body, { headers , responseType: "json"}) as Observable<Token>;
  }
}
