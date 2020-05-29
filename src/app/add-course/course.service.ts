import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { Course } from './Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  HttpClient: any;
  head:string;
  id:string;
  des:string;
  file:Course;
  contentList:Course[];
  //สำหรับส่งไปหน้าวีดีโอ
  filename:string;
  fid:string;


  constructor(private http: HttpClient, private global: GlobalService) {
    // this.contentList = [];
  }
  public getList(): Observable<Course[]> {
    this.contentList = [];
    //เพิ่ม obj เลยให้ comp เรียกใช้
    let url = this.global.baseurl + "php/course/showContent.php";
    let body = "";
    let callUrl: string = url + "?" + body;
    const params = new HttpParams().set('SBId',this.global.nowSubject);
    return this.http.get(callUrl).pipe(map((res: any) => {
      if (res.message != "Success") {
        return [];
      }
      let arr: Course[] = [];
      for (let dbCourse of res.data) {
        if(dbCourse.SBID == this.global.nowSubject){
          let s: Course = new Course(dbCourse.LID,dbCourse.Lname, dbCourse.Ldes);
          let index = arr.findIndex(x => x.LID == dbCourse.LID);
          if(dbCourse.type != null){
            if(index != -1){
              arr[index].addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
            }else{
              s.addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
              arr.push(s);
              this.contentList.push(s);
            }
          }
        }
      }
      return arr;
    }));
  }

  public addCourse (header:string,description:string):Observable<boolean> {
    //เพิ่ม obj ที่ component เพราะต้องเอาหัวมาโปะกับไฟล์(uploadfile)จะได้เป็น course
    let url = this.global.baseurl + "php/course/addContent.php";
    const params = new HttpParams().set('Lname',header).set('Ldes', description).set('SBID',this.global.nowSubject);
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
  public uploadFile(file:FormData,header:string,description:string):Observable<Course> {
    //เพิ่ม obj ที่ component เพราะต้องเอาหัวมาโปะกับไฟล์(uploadfile)จะได้เป็น course
    console.log(file);
    let url = this.global.baseurl + "php/course/uploadFile.php";
    return this.http.post(url,file)
        .pipe(map((res: any) => {
          console.log("tets: "+res.message);
          if (res.message != "Success") {
            return ;
          }
          let c:Course;
          let status = 0;
          for (let dbCourse of res.data) {
            if(status == 0 ){
              c = new Course(dbCourse.LID,"head", "des");
              c.addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
              status += 1;
            }else{
              c.addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
            }
          }
          c.setHeader(header);
          c.setDescription(description);
          this.contentList.push(c);
          return c;
        }));
  }
  public editCourse(lname:string,ldes:string,lid:string):Observable<any> {
    //only edit not create : @component
    let url = this.global.baseurl + "php/course/editContent.php";
    const params = new HttpParams().set('Lname',lname).set('Ldes',ldes).set('LID',lid).set('SBID',this.global.nowSubject).set('status',status);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        if (res.message == "Success"){
          console.log("edit success");
          return true;
        }else{
          console.log("edit fail");
          return false;                                                                                                                                                      
        }
      }));
  }
  public EditUploadFile(file:FormData):Observable<Course> {
    //only edit not create : @component
    let url = this.global.baseurl + "php/course/EditUploadFile.php";
    return this.http.post(url,file)
    .pipe(map((res: any) => {
      if (res.message != "Success") {
        return ;
      }
      let c:Course;
      let status = 0;
      for (let dbCourse of res.data) {
        if(status == 0 ){
          c = new Course(dbCourse.LID,"head", "des");
          c.addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
          status += 1;
        }else{
          c.addTypeFilePath(dbCourse.type,dbCourse.Fname,dbCourse.Fpath,dbCourse.FID);
        }
      }
      return c;
    }));
  }
  public deleteCourse(lid:string):Observable<any>{
    //@service
    let url = this.global.baseurl + "php/course/deleteContent.php";
    const params = new HttpParams().set('LID',lid);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(map((res: any) => {
        if (res.message == "Success"){
          console.log("delete success");
          let index = this.contentList.findIndex(i => i.LID === lid);
          this.contentList.splice(index,1);
          return true;
        }else{
          console.log("delete fail");
          return false;                                                                                                                                                      
        }
      }));
  }
  public deleteFile(fid:string,path:string):Observable<any>{
    //@component
    let url = this.global.baseurl + "php/course/deleteFile.php";
    const params = new HttpParams().set('FID',fid).set('Fpath',path);
    return this.http.post(url,params.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      })
    .pipe(map((res: any) => {
      if (res.message == "Success"){
        console.log("delete success");
        return true;
      }else{
        console.log("delete fail");
        return false;                                                                                                                                                      
      }
    }));
  }
  public setDialogData(course:Course){
    this.file = course;
  }
}
