import { Component, OnInit ,Input, EventEmitter, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../global.service';
import { HomeService } from '../home.service';
import { Subject } from '../Subject';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mymodalhome',
  templateUrl: './mymodalhome.component.html',
  styleUrls: ['./mymodalhome.component.css']
})
export class MymodalhomeComponent implements OnInit {
  // @Input() sbid;sbname;sbdes;
  // @Output() messageEvent = new EventEmitter<Subject>();
  //[(ngModel)]
  subjectID: string;
  subjectName: string;
  subjectDes: string;
  subjectList: Subject[];//เอาไว้อัพเดทค่าที่แสดงปัจจุบัน
  fail:boolean;//แสดงเมื่อสร้าง content ไม่สำเร็จ
  obj:Subject;//อัพเดทค่าของวิชานี้ใน global

  constructor(public activeModal: NgbActiveModal,private gService:GlobalService,private service: HomeService,private router:Router) {
    
   }

  ngOnInit() {
    this.fail = false;
    this.subjectList = this.service.allSubject;
  }
  addSubject(): void {
    this.service.addCourse(this.subjectID, this.subjectName, this.subjectDes).subscribe(result =>{
      if(result != false){
        // this.sbid = this.subjectID;
        this.obj = new Subject(this.subjectID,this.subjectName,this.subjectDes);
        this.service.allSubject.push(this.obj);
      }
    });
  }
  close(){
    if(this.subjectID != undefined && this.subjectID != undefined && this.subjectID != undefined){
      let tmp2 = this.subjectList.filter(f => 
        f.id == this.subjectID
      );
      if(tmp2.length == 0){
        this.addSubject();
        // this.sendMessage();
        this.activeModal.close('Close click');
      }else{
        this.fail = true;
      }
    }else{
      this.fail = true;
    }
  }

}
