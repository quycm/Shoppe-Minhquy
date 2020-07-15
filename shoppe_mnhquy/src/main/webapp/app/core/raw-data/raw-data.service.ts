import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceAPI } from 'app/core/constants/service-api';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { CommonService } from 'app/core/service/common.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {
  constructor(private http: HttpClient, private alertService: JhiAlertService, private commonService: CommonService) {}

  create(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.rawData.create);
    return this.http.post<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Tạo thành công dữ liệu thô  ' + u.name + ' với ID #' + u.id, null, null);
        }
      })
    );
  }

  getListRawData(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.rawData.getListRawData, param);
    return this.http.get(api, { observe: 'response' });
  }
}
