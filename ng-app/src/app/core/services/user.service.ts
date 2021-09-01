import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseEntityService } from './base-entity.service';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseEntityService<User> {
  constructor(protected http: HttpClient) {
    super(http);
    this.entityUrl = 'users';
  }
}
