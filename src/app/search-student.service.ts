import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { StudentInfo } from './searh-student/StudentInfo';
import { Observable, of } from "rxjs";
import { map,catchError, timestamp,concatMap, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SearchStudentService {
  studentList:StudentInfo[];
  obj;

  constructor(private global:GlobalService,private http: HttpClient) {
    this.studentList = [];
   }

  showStudent(): Observable<boolean>{
    this.studentList=[];
    let url = this.global.baseurl + "php/studentList/showStudent.php";
    let params = new HttpParams().set('SBID',this.global.nowSubject);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res:any) => {
      if (res.message != "Success") {
        return false;
      }
      let arr: StudentInfo[] = [];
      console.log("data: "+res.data);
      for (let db of res.data) {
        let s: StudentInfo = new StudentInfo(db.SID, db.Sname,db.Sdepartment);
        arr.push(s);
        this.studentList.push(s);
      }
      return true;
    }));
  }

  addStudent(sid:string,SBID:string): Observable<any>{
    let url = this.global.baseurl + "php/studentList/addStudent.php";
    console.log("add");
    const params = new HttpParams().set('SID',sid).set('Sname',this.obj.data.displayname_en).set('Sdepartment',this.obj.data.department)
                  .set('SBID',SBID);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          console.log(res.data);
          if (res.message == "Success"){
            console.log("add success");
            let s: StudentInfo = new StudentInfo(sid, this.obj.data.displayname_en,this.obj.data.department);
            this.studentList.push(s);
            return true;
          }else{
            console.log("add fail");
            return false;
          }
        }));
  }
  checkStudentInfo(sid:string):Observable<boolean>{
    let url = this.global.baseurl + "php/authenAndGetInfo.php";
    const params = new HttpParams().set('SID',sid);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })

    .pipe(
      delay(1000),
      map((res: any) => {
      console.log("res.data "+res.data+ "of " +sid);
      this.obj = JSON.parse(res.data);
      if (this.obj.status){
        return true;
      }else{
        return false;
      }
    }),
    catchError(err => {
      console.log(err.message);
      console.log("Error is handled");
      return of(false);
    })
    );
  }

   deleteStudent(student:string,sbid:string):Observable<boolean>{
    //@service
    let url = this.global.baseurl + "php/studentList/deleteStudent.php";
    const params = new HttpParams().set('SID',student).set('SBID',sbid);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        if (res.message == "Success"){
          console.log("delete success");
          return true;
        }else{
          return false;                                                                                                                                                      
        }
      }));
  }

 
  deleteAllStudent(sbid:string):Observable<boolean>{
    //@service
    let url = this.global.baseurl + "php/studentList/deleteAllStudent.php";
    const params = new HttpParams().set('SBID',sbid);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        if (res.message == "Success"){
          console.log("delete success");
          this.studentList.length = 0;
          return true;
        }else{
          return false;                                                                                                                                                      
        }
      }));
  }
}
