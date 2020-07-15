import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { CommonService } from 'app/core/service/common.service';
import { Observable } from 'rxjs';
import { serviceAPI } from 'app/core/constants/service-api';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolkService {
  constructor(private http: HttpClient, private alertService: JhiAlertService, private commonService: CommonService) {}

  create(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.folk.create);
    return this.http.post<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Tạo thành công dân tộc  ' + u.name + ' với ID #' + u.id, null, null);
        }
      })
    );
  }

  findName(name?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.folk.getInfoFolkByName, { name });
    return this.http.get<any>(api, { observe: 'response' });
  }

  // Method : Get list folk
  getListFolk(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.folk.getListFolk, param);
    return this.http.get(api, { observe: 'response' });
  }

  find(id?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.folk.getInfoFolk, { id });
    return this.http.get<any>(api, { observe: 'response' });
  }

  update(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.folk.update);
    return this.http.put<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Cập nhật thành công Dân tộc: ' + u.name, null, null);
        }
      })
    );
  }
}
