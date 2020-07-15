import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICompany } from './company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  httpClient: HttpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  getALL(params = {}): Observable<any> {
    const resource = 'company:getallcompany';

    const httpHeaders = new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json', Resource: resource });
    // const httpParams = new HttpParams();
    const apiUrl = SERVER_API_URL + 'api/company';
    return this.http.get(apiUrl, { params, headers: httpHeaders, observe: 'response' });
  }

  getByID(id: any): Observable<ICompany> {
    const apiUrl = SERVER_API_URL + 'api/company/';
    return this.http.get<ICompany>(`${apiUrl}/${id}`);
  }

  filter(filter?: any): Observable<any> {
    const apiUrl = SERVER_API_URL + 'api/company/find';
    const options = createRequestOption(filter);
    return this.http.get(apiUrl, { params: options, observe: 'response' });
  }

  create(company?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/company';
    return this.http.post(resourceUrl, company);
  }
  delete(id?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/company/deletes';
    return this.http.put(resourceUrl, null, {
      params: { id }
    });
  }

  update(company?: any): Observable<any> {
    const resourceUrl = SERVER_API_URL + 'api/company/update';
    return this.http.put(resourceUrl, company);
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
