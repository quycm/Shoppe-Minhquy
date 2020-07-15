import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { map, catchError } from 'rxjs/operators';
import { IEmployee } from './employee.model';
import { createRequestOption } from 'app/shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  httpClient: HttpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  getALL(params = {}): Observable<any> {
    const resource = 'employee:getallemployee';
    const httpHeaders = new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json', Resource: resource });
    const apiUrl = SERVER_API_URL + 'api/employee';
    return this.http.get(apiUrl, { params, headers: httpHeaders, observe: 'response' });
  }

  getByID(id: any): Observable<IEmployee> {
    const apiUrl = SERVER_API_URL + 'api/employee';
    return this.http.get<IEmployee>(`${apiUrl}/${id}`);
  }

  filter(filter?: any): Observable<any> {
    const apiUrl = SERVER_API_URL + 'api/employee/find';
    const options = createRequestOption(filter);
    return this.http.get(apiUrl, { params: options, observe: 'response' });
  }

  create(employee?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/employee';
    return this.http.post(resourceUrl, employee);
  }
  delete(id?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/employee/delete';
    return this.http.put(resourceUrl, null, {
      params: { id }
    });
  }

  update(department?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/employee/update';
    return this.http.put(resourceUrl, department);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
