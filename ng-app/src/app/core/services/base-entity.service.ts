import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseEntityService<T> {
  protected apiUrl: string;
  protected entityUrl: string;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(protected http: HttpClient) {
    this.entityUrl = '';
    this.apiUrl = `${environment.apiUrl}`;
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.entityUrl}/`, {
      headers: this.headers,
    });
  }
  get(id: string | null): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entityUrl}/${id}/`, {
      headers: this.headers,
    });
  }
  update(entity: any): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}/${this.entityUrl}/${entity._id}/`,
      entity,
      { headers: this.headers }
    );
  }
  add(entity: T) {
    return this.http.post<T>(`${this.apiUrl}/${this.entityUrl}/`, entity, {
      headers: this.headers,
    });
  }
  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entityUrl}/${id}/`, {
      headers: this.headers,
    });
  }
  fullUrl() {
    // importante realizar el cierre con / a la hora de pasar parametros adicionales, condicion Django
    return `${this.apiUrl}/${this.entityUrl}/`;
  }
}
