import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CourseService } from './course.service';
import { GlobalService } from '../global.service';
import { Course } from './Course';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from './mymodal/mymodal.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { empty } from 'rxjs';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'] 
})
export class AddCourseComponent implements OnInit {
  id:string;//เอาไว้เลือกว่าจะเปิดของไอดีไหน
  // [(ngModel)]
  headName:string;
  description:string;

  contentList:Course[];//แสดงคอนเทนต์และรายการอัพเดท
  subj:string ;//ชื่อวิชา
  fail:boolean;//แสดงไดอะล้อคเมื่อสร้างไม่เสร็จ
  success:boolean;//แสดงเมื่อสร้างเสร็จแล้ว
  show:boolean;//แสดงเมนูนักศึกษาที่ลงทะเบียน
  filename:string[]=[];     //ตัวแปรเปล่าสำหรับเก็บชื่อไฟล์ตอนก่อนจะ add จะมีการรีใหม่ทุกครั้ง
  file:string[] = [];       //ตัวแปรเปล่าสำหรับเก็บไฟล์ตอนก่อนจะ add จะมีการรีใหม่ทุกครั้ง

  constructor(private cService:CourseService,private global:GlobalService,
    private modalService:NgbModal,private router:Router,private http: HttpClient) {

   }

  ngOnInit() {
    if(this.global.username == undefined || this.global.username== ""){
      this.router.navigateByUrl('/loginPage');
    }
    this.fail = false;
    this.success = false;
    this.show = this.global.status;
    this.subj = this.global.nowSubject;
    this.cService.getList().subscribe(courses => {
      if (courses != undefined) {
        this.contentList = this.cService.contentList;
      } else {
        this.contentList = [];
      }
    });
  }

  addContent(){
    const fileToUpload = new FormData();
    for(var i=0; i<this.file.length; i++){
      fileToUpload.append('fileToUpload[]',this.file[i]);
    }
    console.log(this.file);
    if(this.headName != undefined && this.description != undefined && this.file.length != 0){
      this.cService.addCourse(this.headName,this.description).subscribe();
      if(this.file.length!=0){
        this.cService.uploadFile(fileToUpload,this.headName,this.description).subscribe();
      }
    
      this.success = true;
      this.fail = false;
      this.headName = "";
      this.description = "";
      this.global.updateNotification(this.subj,"content").subscribe(result =>{
        if(result){
          console.log(true);
        }
      });
    }else{
      this.fail = true;
      this.success = false;
    }
  }
  showContent(){
    this.contentList = this.cService.contentList;
  }

  open(id:string,header:string,description:string) {
    if(this.global.status){
      const result :Course[] = this.contentList.filter(function(f){
        return f.LID == id;
      });
      this.cService.file = result[0];
      let filename = [];
      for(let i=0; i<result.length; i++){
        for(let j=0; j<result[i].fname.length; j++){
          filename.push(result[i].fname[j]);
        }
      }

      const modalRef = this.modalService.open(MymodalComponent);
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.title = 'edit';
      modalRef.componentInstance.head = header;
      modalRef.componentInstance.description = description ;

    }
  }
  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
      if(event.target.files[i].name.length > 0 && event.target.files[i].size < 200000000){
        this.file.push(event.target.files[i]);
        this.filename.push(event.target.files[i].name);
      }
    }
  }
  deleteFromList(index:any){ //เอาไว้ลบก่อนจะกดadd
    this.filename.splice(index,1);
    this.file.splice(index,1);
  }
  reset() {
    this.headName = "";
    this.description = "";
    this.file = [];
    this.filename = [];
  }
  playerVDO(path:string,name:string,fid:string){
    console.log("cservice: "+fid);
    this.global.vdoPath(path);
    this.cService.filename = name;
    console.log(name);
    this.cService.fid = fid;
    this.router.navigateByUrl('/mainPage/videoPlayer');
  }

}
