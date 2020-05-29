import { Injectable } from '@angular/core';
import { Subject } from './Subject';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
// import "rxjs/add/operator/do";
// import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  HttpClient: any;
  // sucess:boolean;
  // fail:boolean;
  allSubject:Subject[];//อัพเดทและแสดงวิชาทั้งหมด
  // obj:Subject;
  constructor(private http: HttpClient, private global: GlobalService) {
    // this.sucess = false;
    // this.fail = false;
    this.allSubject = [];
  }
  public getList2(): Observable<Subject[]> {
    this.allSubject = [];
    let url;
    let params;
    console.log(this.global.status);
    if(this.global.status){
      url = this.global.baseurl + "php/home/subjectList.php";
      params = new HttpParams().set('TID',this.global.username);
    }else{
      url = this.global.baseurl + "php/student/showList.php";
      params = new HttpParams().set('SID',this.global.username);
    }
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        if (res.message != "Success") {
          return [];
        }
        let arr: Subject[] = [];
        for (let dbCourse of res.data) {
          let s: Subject = new Subject(dbCourse.SBID, dbCourse.SBname, dbCourse.SBdes);
          arr.push(s);
          this.allSubject.push(s);
        }
        // this.allSubject = arr;
        return arr;
      }));
  }
  
  public addCourse (SBID:string, SBname:string,SBdes:string):Observable<boolean> {
    let url = this.global.baseurl + "php/home/addSubject.php";
    const params = new HttpParams().set('SBId',SBID).set('SBname', SBname).set('SBdes', SBdes).set('TID',this.global.username);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            return true;
          }else{
            console.log("add fail");
            return false;
          }
        }));
  }
  deleteSubject(index:any){
    let url = this.global.baseurl + "php/home/deleteSubject.php";
    const params = new HttpParams().set('SBID',this.allSubject[index].id);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            this.allSubject.splice(index,1);
            return true;
          }else{
            return false;
          }
        }));
  }
 
}
