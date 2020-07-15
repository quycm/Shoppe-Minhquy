import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';
  public resourceRegisterUrl = SERVER_API_URL + 'api/register';

  constructor(private http: HttpClient) {}

  create(user?: any): Observable<any> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user?: any): Observable<any> {
    return this.http.put<IUser>(this.resourceUrl, user);
  }

  find(login?: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  query(req?: any): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }
  getAll(params = {}): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl, {
      params,
      observe: 'response'
    });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }

  register(user?: any): Observable<any> {
    return this.http.post<IUser>(this.resourceRegisterUrl, user);
  }
  filter(filter?: any): Observable<any> {
    const apiUrl = SERVER_API_URL + 'api/users/find';
    const options = createRequestOption(filter);
    return this.http.get(apiUrl, { params: options, observe: 'response' });
  }
}
