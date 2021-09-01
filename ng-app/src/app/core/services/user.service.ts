import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseEntityService } from './base-entity.service';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseEntityService<User> {
  constructor(protected http: HttpClient) {
    super(http);
    this.entityUrl = 'users';
  }
  checkField(fieldName: string, value: string, id?: string | null) {
    let params = new HttpParams()
      .append('field', fieldName)
      .append('value', value);
    return this.http.get<{ valid: boolean }>(
      `${this.apiUrl}/${this.entityUrl}/${id ? id + '/' : ''}check-mci/`,
      { params }
    );
  }
}
