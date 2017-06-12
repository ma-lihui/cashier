import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare let $bsAppApi;

@Injectable()
export class Common {
  constructor(public http: Http) {
    //console.log('Hello Common Provider');
  }
  dateFormat(fmt:string,date=new Date()) {
    let o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  scan(callback){
    //二维码扫描
    // 1)callback: [function(result=>{data:数据}, err=>{msg:错误信息}){}]
    // eg:
    // $bsAppApi.scan(function (ret, err) {
    //   alert(JSON.stringify({ret: ret, err: err}));
    // });
    if($bsAppApi) {
      $bsAppApi.scan(callback);
    }
  }
}
