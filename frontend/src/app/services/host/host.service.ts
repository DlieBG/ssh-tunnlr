import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Host } from 'src/app/interfaces/host';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private httpClient: HttpClient) { }

  public getHosts(): Observable<Host[]> {
    return this.httpClient.get<Host[]>(`${environment.apiUrl}/host`);
  }

  public getHost(hostId: string): Observable<Host> {
    return this.httpClient.get<Host>(`${environment.apiUrl}/host/${hostId}`);
  }

  public postHost(host: Host): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/host`, host);
  }

  public putHost(host: Host): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/host`, host);
  }

  public deleteHost(hostId: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/host/${hostId}`);
  }
}
