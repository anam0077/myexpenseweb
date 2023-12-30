import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  proxyApi = new BehaviorSubject<string>(
   (environment.apiUrl.startsWith('https') ? '' : location.origin) + environment.apiUrl
  );

  constructor() { }

  get proxyApiUrl() {
    return this.proxyApi.value;
  }
}
