import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../course.service'
import { ModalCourseService } from '../modal-course.service';
import { Course } from '../Course';
import { find } from 'rxjs/operators';
import { GlobalService } from '../../global.service';


@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})

export class MymodalComponent implements OnInit {
  @Input() title;id;
  head:string;
  description:string;
  filename2:string[];
  content:any;
  index:any;
  deleteListfid:string[];
  deleteListPath:string[];
  addListName:string[];
  file:string[];
  
  


  constructor(public activeModal: NgbActiveModal,private service:CourseService,private modalService:ModalCourseService,private global:GlobalService) { }

  ngOnInit() {
    this.index =  this.service.contentList.findIndex(i => i.LID === this.id);
    this.content = this.service.contentList[this.index];
    this.filename2 = this.content.fname;
    this.deleteListfid = [];
    this.deleteListPath = [];
    this.addListName = [];
    this.file = [];
    console.log(this.id);
  }

  closeSave(){
    if(this.deleteListfid.length != 0){
      for(let i=0; i<this.deleteFile.length; i++){
        this.service.deleteFile(this.deleteListfid[i],this.deleteListPath[i]).subscribe();
      }
      this.service.contentList[this.index] = this.content;
    }
    //update table
    if(this.addListName.length != 0){
      const fileToUpload = new FormData();
      for(var i=0; i<this.file.length; i++){
        fileToUpload.append('fileToUpload[]',this.file[i]);
      }
      fileToUpload.append('LID',this.content.LID);
      this.service.editCourse(this.head,this.description,this.id).subscribe();
      this.service.EditUploadFile(fileToUpload).subscribe(courses => {
        if (courses != undefined) {
          courses.setHeader(this.head);
          courses.setDescription(this.description);
          this.service.contentList[this.index] = courses;
        }
      });
    }else{
      this.service.editCourse(this.head,this.description,this.id).subscribe();
    }
    this.global.updateNotification(this.global.nowSubject,"edit").subscribe(result =>{
      if(result){
        console.log(true);
      }
    });
    // this.service.getList().subscribe();
    this.activeModal.close('Close click');
  }
  showContent(){
    this.service.getList().subscribe(courses => {
      if (courses != undefined) {
        this.content = courses;
      } else {
        this.content = [];
      }
    });
  }
  closeDelete(){
    //update table
    console.log(this.id);
    this.service.deleteCourse(this.id).subscribe();
    // let index = this.service.contentList.findIndex(i => i.LID === this.id);
    // this.service.contentList.splice(index,1);
    this.activeModal.close('Close click');
  }
  deleteFile(number:any){
    //เพิ่มรายการที่ต้องการลบ
    this.deleteListfid.push(this.content.fid[number]);
    this.deleteListPath.push(this.content.path[number]);

    //ลบออกจากตัวโชว์
    this.content.fid.splice(number,1);
    this.content.fname.splice(number,1);
    this.content.ftype.splice(number,1);
    this.content.path.splice(number,1);
    // this.service.contentList[this.index] = this.content;
  }
  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
      if(event.target.files[i].name.length > 0){
        this.file.push(event.target.files[i]);
        this.addListName.push(event.target.files[i].name);
        this.filename2.push(event.target.files[i].name)
      }
    }
  }

}
