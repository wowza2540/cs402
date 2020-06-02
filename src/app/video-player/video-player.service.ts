import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { PostInfo } from './PostInfo';
import { replyInfo } from './replyInfo';

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
    const params = new HttpParams().set('FID',fid).set('postby',postby).set('QAdetail',detail).set('SID',this.global.username);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            console.log("add success");
            for (let db of res.data) {
              let p: PostInfo = new PostInfo(fid, postby,detail,db.QAID);
              p.setOnwer(this.global.username);
              this.postlist.push(p);
              console.log(db.QAID);
            }
            return true;
          }else{
            console.log("add fail");
            return false;
          }
        }));
  }
  addReply(qaid:string,postby:string,detail:string):Observable<any>{
    let url = this.global.baseurl + "php/student/addReply.php";
    const params = new HttpParams().set('detail',detail).set('postby',postby).set('QAID',qaid).set('ID',this.global.username);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            console.log("add success");
            const index = this.postlist.findIndex(x => x.qaid == qaid);
            let tmp;
            for (let db of res.data) {
             tmp = db.RID;
            }
            let tmp2 = new replyInfo(qaid,postby,detail,tmp);
            tmp.setOwner(this.global.username);
            this.postlist[index].addreply(tmp2);
            console.log(this.postlist[index]);

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
            let s: PostInfo = new PostInfo(db.QAID, db.postby,db.QAdetail,db.QAID);
            s.setOnwer(db.ownerID);
            arr.push(s);
            this.postlist.push(s);
          }
          return true;
        }));
  }
  showReply():Observable<any>{
    console.log("show reply");
    this.postlist = [];
    let url = this.global.baseurl + "php/student/showReply.php";
    const params = new HttpParams();
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message != "Success") {
            return false;
          }
          let arr:replyInfo[] = [];
          for (let db of res.data) {
            let tmp = new replyInfo(db.QAID,db.postby,db.detail,db.RID);
            tmp.setOwner(db.ownerID);
            arr.push(tmp);
          }
          return arr;
        }));
  }
  deleteComment(qaid:string,index:any):Observable<any>{
    let url = this.global.baseurl + "php/student/deleteQA.php";
    const params = new HttpParams().set('QAID',qaid);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            this.postlist.splice(index,1);
            return true;
          }else{
            return false;
          }
        }));
  }
  deleteReply(rid:string,index1:any,index2:any):Observable<any>{
    let url = this.global.baseurl + "php/student/deletereply.php";
    const params = new HttpParams().set('RID',rid);
    return this.http.post(url,params.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .pipe(map((res: any) => {
          if (res.message == "Success"){
            this.postlist[index1].reply.splice(index2,1);
            return true;
          }else{
            return false;
          }
        }));
  }
}
