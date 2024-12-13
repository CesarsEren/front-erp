import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from '../entity/Root';

@Injectable({
  providedIn: 'root',
})
export class AgenciasService {
  private apiUrl = 'http://localhost:8091'; // URL of the API
  constructor(private http: HttpClient) {}
  getAgencias(): Observable<Root> {
    return this.http.get<Root>(`${this.apiUrl}/agencias`).pipe();
  }
}
