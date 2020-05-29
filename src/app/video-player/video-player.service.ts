import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostInfo } from './PostInfo';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  postlist:PostInfo[];

  constructor(private global:GlobalService,private http:HttpClient) { 
    this.postlist = [];
  }
  addComment(fid:string,postby:string,detail:string):Observable<any>{
    let url = this.global.baseurl + "php/student/addQA.php";
    const params = new HttpParams().set('FID',fid).set('postby',postby).set('QAdetail',detail);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            console.log("add success");
            let p: PostInfo = new PostInfo(fid, postby,detail);
            this.postlist.push(p);
            console.log(p);
            return true;
          }else{
            console.log("add fail");
            return false;
          }
        }));
  }
  showComment(fid:string):Observable<any>{
    this.postlist = [];
    let url = this.global.baseurl + "php/student/showQA.php";
    const params = new HttpParams().set('FID',fid);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message != "Success") {
            return false;
          }
          let arr: PostInfo[] = [];
          for (let db of res.data) {
            let s: PostInfo = new PostInfo(db.QAID, db.postby,db.QAdetail);
            arr.push(s);
            this.postlist.push(s);
          }
          return true;
        }));
  }
}
