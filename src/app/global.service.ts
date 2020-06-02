import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from './add-course/Course';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public baseurl:string = "http://localhost/first-app/";
  // public baseurl:string = "http://178.128.90.185/firstApp/";
  // public baseurl:string = "http://localhost/firstApp/";
  username:string;
  name:string;
  nowSubject:string;
  status:boolean = true;
  obj;
  private pathVDO:string;
  employee:string;
  notiList:string[];
  notiSBID:string[];
  lengthnoti:any;
  

  constructor(private http: HttpClient) { 
    this.notiList = [];
    this.notiSBID = [];
    this.lengthnoti = 0;
  }

//1 = teacher,true
//other = student,false
  checkInfo(username:string,password:string):Observable<boolean>{
    let url = this.baseurl + "php/authentication.php";
    const params = new HttpParams().set('username',username).set('password',password);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
    .pipe(map((res: any) => {
      if (res.message == "Success"){
        this.obj = JSON.parse(res.data);
        if(this.obj.status != "FALSE"){
          this.status = false;
          this.name = this.obj.displayname_en;
          this.username = username;
          return true
        }else{
          return false;
        }
      }else{
        console.log("fail");
        return false;
      }
    }));
  }
  setUserAccount(username:string,name:string){
    this.username = username;
    this.name = name;
  }
  vdoPath(path:string){
    this.pathVDO = path;
  }
  getPath():string{
    return this.pathVDO;
  }
  updateNotification(sbid:string,type:string):Observable<boolean>{
    let url = this.baseurl + "php/notificationUpdate.php";
    let params;
    if(this.status){
      params = new HttpParams().set('SBID',sbid).set('notiType', type).set('owner','teacher');
    }else{
      params = new HttpParams().set('SBID',sbid).set('notiType', type).set('owner','student');
    }
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            console.log("add success");
            return true;
          }else{
            console.log("add fail");
            return false;                                                                                                                                                      
          }
        }));
  }
  getNotification(username:string):Observable<boolean>{
    this.notiList = [];
    let url = this.baseurl + "php/shownotification.php";
    let params;
    if(!this.status){
      params = new HttpParams().set('owner','student').set('us',username);
      console.log(username+":student");
    }else{
      params = new HttpParams().set('owner','teacher').set('us',username);
      console.log(username+":teacher");
    }
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        console.log(res.message);
        if (res.message != "Success") {
          console.log("unsuccess");
          return false;
        }
        let str;
        for (let db of res.data) {
          str = db.SBID+"ได้มีการ";
          if(db.notiType == "content"){
            str += "อัปโหลดบทเรียนใหม่"+"\n";
          }else if(db.notiType == "comment"){
            str += "คอมเม้น"+"\n";
          }else{
            str += "แก้ไข"+"\n";
          }
          str += "เมื่อวันที่ "+ db.timestamp;
          this.notiList.push(str);
          this.notiSBID.push(db.SBID);
        }
        this.lengthnoti = this.notiList.length;
        console.log(this.lengthnoti);
        // this.allSubject = arr;
        return true;
      }));
  }
}
