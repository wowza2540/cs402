import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { SearchStudentService } from '../search-student.service';
import { StudentInfo } from './StudentInfo';
// import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';


@Output()

@Component({
  selector: 'app-searh-student',
  templateUrl: './searh-student.component.html',
  styleUrls: ['./searh-student.component.css']
})
export class SearhStudentComponent implements OnInit {
  // students: student[];
  searchText: string;//ข้อความที่พิมพ์จากกล่อง
  // isShown: boolean = true;
  // studentAdd:string[];
  studentList:StudentInfo[];//แสดงชื่อและอัพเดท
  subj:string ;//แสดงชื่อวิชา
  //[สำหรับลบของ]
  // deleteObj:string[];
  // value: any;
  //[สำหรับแจ้งเตือนการกระทำ]
  fail:boolean;
  success:boolean;
  show:boolean;
  warning:string;
  edit:boolean;
  constructor(private studentService:SearchStudentService,private global:GlobalService,private router:Router) {
    
  }

  ngOnInit() {
    this.edit = true;
    this.fail = false;
    this.success = false;
    if(this.global.username == undefined || this.global.username== ""){
      this.router.navigateByUrl('/loginPage');
    }
    this.showList();
    this.show = this.global.status;
    this.subj = this.global.nowSubject;
  }

  showList(){
    this.studentList = [];
    this.studentService.showStudent().subscribe(s => {
      // if (s) {
        this.studentList = this.studentService.studentList;
      // } else {
      //   this.studentList = [];
      // }
    });
  }
  addStudent(){
    console.log("add com");
    try{
      let studentAdd = this.searchText.split(',');
      if(studentAdd.length != 0 && this.searchText != ""){
        let i=0; 
        let conti = false;
        for(let i=0; i<studentAdd.length; i++){
          if(!this.InList(studentAdd[i])){
            console.log(studentAdd[i]);
            this.studentService.checkStudentInfo(studentAdd[i])
            .subscribe(result =>{
              let rs = studentAdd[i];
              if(result){
                this.success = true;
                this.fail  = false;
                this.studentService.addStudent(rs,this.subj).subscribe();
              }else{
                this.fail = true;
                this.success = false;
                this.warning ="invalid input";
              }
            console.log(result);
            });
          }
        }
      }else{
        this.fail = true;
        this.success = false;
        this.warning ="input is empty";
      }
      this.searchText="";
    }catch(Exception){
      this.fail = true;
      this.success = false;
      this.warning ="ไม่มีการกรอกรหัสนักศึกษา หรือ รูปการใส่คำตอบไม่ถูกต้อง";
    }
    
  }
  InList(id:string):boolean{
    let tmp = this.studentList.filter(f => 
      f.id == id
    );
    
    if(tmp.length != 0){
      console.log("in list: "+true);
      return true;
    }
    console.log("in list: "+false);
    return false;
  }
  // readFromfile(){
  //   console.log("read from file");
  // }
  deleteStudent(status:string,sid:any,ind:any){

    if(status == "All"){
      console.log("deleteStudent: "+status+" "+sid+" "+ind)
      this.studentService.deleteAllStudent(this.subj).subscribe();
    }else{
      console.log("deleteStudent: "+status+" "+sid+" "+ind)
      this.studentService.deleteStudent(sid,this.subj).subscribe(result =>{
        if(result){
          this.studentService.studentList.splice(ind,1);
        }
      });
    }
  }
  // checkStudent(input:string){
  //   //คืนค่า boolean
  // }
  clickToEditList() {
    this.edit = false;
  }





}

