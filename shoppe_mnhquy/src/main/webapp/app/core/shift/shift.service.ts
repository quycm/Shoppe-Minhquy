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
export class ShiftService {
  constructor(private http: HttpClient, private alertService: JhiAlertService, private commonService: CommonService) {}

  // Method : Get list shift
  getListShift(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.shift.getListShift, param);
    return this.http.get(api, { observe: 'response' });
  }

  create(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.shift.create);
    return this.http.post<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Tạo thành công ca làm việc:  ' + u.name + ' với ID #' + u.id, null, null);
        }
      })
    );
  }

  find(id?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.shift.getInfoShift, { id });
    return this.http.get<any>(api, { observe: 'response' });
  }

  update(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.shift.update);
    return this.http.put<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Cập nhật thành công ca làm việc: ' + u.name, null, null);
        }
      })
    );
  }
}
