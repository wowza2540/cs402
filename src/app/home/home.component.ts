import { Component, OnInit, Input } from '@angular/core';
import { Subject } from './Subject';
import { HomeService } from './home.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../global.service';
import { MymodalhomeComponent } from './mymodalhome/mymodalhome.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show:boolean;//บอกว่าถ้าเป็นอาจารย์ให้แสกงปุ่มเพิ่มครอสเรียน
  // private sbid:String; // แทนที่ด้วยบรรทัดที่ 60 
  sbname:String; //ส่งของไปเลยไม่ต้องคิวลี่
  sbdes:String; // ส่งของไปเลยไม่ต้องคิวลี่
  subjectList: Subject[]; //แสดงรายวิชาทั้งหมดที่หน้า home
  edit:boolean;

  constructor(private service: HomeService, private modalService: NgbModal,private gService:GlobalService,private router:Router) {
  }

  ngOnInit() {
    this.edit = true;
    console.log(this.gService.username);
    if(this.gService.username == undefined || this.gService.username== ""){
      this.router.navigateByUrl('/loginPage');
    }
    this.show = this.gService.status;
    this.service.getList2().subscribe(courses => {
      if (courses != undefined) {
        this.subjectList = this.service.allSubject;
        console.log(this.subjectList);
      } else {
        this.subjectList = [];
      }
    });
    
    
  }
 
  open() {
    const modalRef = this.modalService.open(MymodalhomeComponent);
    modalRef.componentInstance.sbid = this.gService.nowSubject;
    modalRef.componentInstance.sbname = this.sbname;
    modalRef.componentInstance.sbdes = this.sbdes;

  }

  onClick(SBID:string){
    this.gService.nowSubject = SBID;
    this.router.navigateByUrl('/mainPage/addCourse');
  }
  receiveMessage($event) {
    // console.log("้home component: receiveMessage");
    // this.obj = $event;
    // console.log(this.obj);
  }
  deleteSubject(index:any){
    this.service.deleteSubject(index).subscribe();
  }
  setEdit(){
    this.edit = false;
  }
  setEdit2(){
    this.edit = true;
  }
  
}