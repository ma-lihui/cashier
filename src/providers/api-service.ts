import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

/*
 Generated class for the ApiService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ApiService {
  url:string;
  reqParam:any;
  //URL = 'http://121.41.36.202/saas_api/?app_act=';
  URL = 'http://218.242.57.203:8422/ipos+lite/api/web/?app_act=index/route&api=';
  gateway = 'https://ipos-plus.baison.com.cn/saas_api/index.php?app_act=index/route&api=base/system/gateway';//暂时写死
  key:string;
  password:string;
  sign:any;
  datetime:any;
  constructor(public http: Http, public md5: Md5) {
    this.key = 'lite';
    this.datetime = new Date();
    this.password = '123456';


    let year = this.datetime.getFullYear();
    let month = this.datetime.getMonth() + 1 < 10 ? "0" + (this.datetime.getMonth() + 1) : this.datetime.getMonth() + 1;
    let date = this.datetime.getDate() < 10 ? "0" + this.datetime.getDate() : this.datetime.getDate();
    let date_str = year + "-" + month + "-" + date;

    let str = this.key + this.password + date_str;
    this.sign = md5.appendStr(str).end();
  }

  post(api:string,params:any) {
    params.key = this.key;
    params.sign = this.sign;
    let date:any = new Date();
    params.time = parseInt(String(date / 1000));
    let headers = new Headers({
      // 'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return new Promise((resolve, reject) => {
      this.url = this.URL + api;
      this.reqParam = {
        url: this.url,
        param: params
      };
      if(1) {
        this.http.post(this.gateway, this.urlEncode(this.reqParam,null,true), options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
      }else {
        this.http.post(this.url, this.urlEncode(params,null,true), options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
      }
    })
  }

  /**
   * param 将要转为URL参数字符串的对象
   * key URL参数字符串的前缀
   * encode true/false 是否进行URL编码,默认为true
   *
   * return URL参数字符串
   */
  private urlEncode = function (param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (let i in param) {
        let k = key == null ? i : key +  '[' + i + ']' ;
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }
    return paramStr;
  };

  get(url:string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + url)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
          })
    })
  }
}
