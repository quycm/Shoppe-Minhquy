import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {}

  /**
   * Method handler query params for api
   * @param body data query params
   */
  buildQueryParamsString(body: any) {
    return Object.keys(body)
      .map(key => {
        const paramValue = body[key] || '';
        return encodeURIComponent(key) + '=' + encodeURIComponent(paramValue);
      })
      .join('&');
  }

  /**
   * Method handler convert params api
   * @param apiUriTemplate api template
   * @param params data want add to params api
   * @return api have data
   */
  buildAPIUrl(apiUriTemplate: string, params?: object) {
    // Sample URL:
    // 'test-design/test-viewpoints/{projectId}/find-childs?vpId={vpId}|tmpId={tmpId}'
    // Filter query parameters
    let queryParams = null;
    if (params) {
      // tslint:disable-next-line:forin
      Object.keys(params).forEach(key => {
        const chkKey = '/{' + key;
        if (!apiUriTemplate.includes(chkKey)) {
          if (!queryParams) {
            queryParams = {};
          }
          queryParams[key] = params[key];
        }
      });
    }
    // Rebuild query parameter of template
    const urlParts = apiUriTemplate.split('?');
    let newUrl = urlParts[0];
    if (urlParts.length > 1 && queryParams) {
      newUrl = newUrl + '?' + this.buildQueryParamsString(queryParams);
    }
    // Assign value of request parameters
    if (params) {
      Object.keys(params).forEach(key => (newUrl = newUrl.replace(`{${key}}`, params[key])));
    }

    return SERVER_API_URL + newUrl;
  }
}
