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
export class TimesheetService {
  constructor(private http: HttpClient, private alertService: JhiAlertService, private commonService: CommonService) {}
  create(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.timesheet.create);
    return this.http.post<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Chỉnh sửa thành công thời gian biểu  ' + u.name + ' với ID #' + u.id, null, null);
        }
      })
    );
  }

  update(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.timesheet.update);
    return this.http.put<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Cập nhật thành công thời gian biểu: ' + u.name, null, null);
        }
      })
    );
  }

  getListTimesheet(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.timesheet.getListTimesheet, param);
    return this.http.get(api, { observe: 'response' });
  }

  filterTimesheet(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.timesheet.filter, param);
    return this.http.get(api, { observe: 'response' });
  }

  find(id?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.timesheet.getInfoTimesheet, { id });
    return this.http.get<any>(api, { observe: 'response' });
  }
}
