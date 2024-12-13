import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root, Solicitudgrt } from '../entity/Root';

@Injectable({
  providedIn: 'root',
})
export class SolicitudgrtService {
  private apiUrl = 'http://localhost:8091'; // URL of the API
  constructor(private http: HttpClient) {}
  postSolicitud(solicitudgrt: Solicitudgrt): Observable<Root> {
    return this.http
      .post<Root>(`${this.apiUrl}/solicitudgrt`, solicitudgrt)
      .pipe();
  }
}
