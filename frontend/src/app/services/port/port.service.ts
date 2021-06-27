import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Port } from 'src/app/interfaces/port';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  constructor(private httpClient: HttpClient) { }

  public getPort(portId: string): Observable<Port> {
    return this.httpClient.get<Port>(`${environment.apiUrl}/port/${portId}`);
  }

  public postHost(port: Port, hostId: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/port/${hostId}`, port);
  }

  public putHost(port: Port): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/port`, port);
  }

  public deleteHost(portId: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/port/${portId}`);
  }
}
