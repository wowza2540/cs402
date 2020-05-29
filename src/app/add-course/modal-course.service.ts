import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModalCourseService {

  constructor(private global:GlobalService,private http: HttpClient) { }

  public editCourse(lname:string,ldes:string,lid:string):Observable<boolean> {
    let body = "&Lname="+lname+"&Ldes="+ldes+"&LID="+lid;
    let header = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    let url = this.global.baseurl + "php/course/editContent.php";
    const params = new HttpParams().set('Lname',lname).set('Ldes',ldes).set('LID',lid);
    return this.http.put(url,body,{
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
}
