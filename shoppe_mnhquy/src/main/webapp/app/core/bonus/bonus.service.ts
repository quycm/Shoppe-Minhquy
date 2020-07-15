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
export class BonusService {
  constructor(private http: HttpClient, private alertService: JhiAlertService, private commonService: CommonService) {}

  create(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.create);
    return this.http.post<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Chỉnh sửa thành công ưu đãi  ' + u.name + ' với ID #' + u.id, null, null);
        }
      })
    );
  }

  update(body?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.update);
    return this.http.put<any>(api, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          const u = response.body;
          this.alertService.success('Cập nhật thành công Dân tộc: ' + u.name, null, null);
        }
      })
    );
  }

  getListBonus(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.getListBonus, param);
    return this.http.get(api, { observe: 'response' });
  }

  filterBonus(param?): Observable<any> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.filter, param);
    return this.http.get(api, { observe: 'response' });
  }

  find(id?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.getInfoBonus, { id });
    return this.http.get<any>(api, { observe: 'response' });
  }

  findName(name?): Observable<HttpResponse<any>> {
    const api = this.commonService.buildAPIUrl(serviceAPI.bonus.getInfoBonusByName, { name });
    return this.http.get<any>(api, { observe: 'response' });
  }
}
