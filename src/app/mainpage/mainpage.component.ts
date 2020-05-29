import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  title = 'first-app';
  name:string;
  profilePic:string;
  noti:string[];
  opennoti:any;
  lengthnoti:any;

  constructor(private service:GlobalService,private homeService:HomeService,private router:Router){
    this.name = service.name;
  }
  ngOnInit() {
    if(this.service.username == undefined || this.service.username== ""){
      this.router.navigateByUrl('/loginPage');
    }
    this.opennoti = 1;
    this.name = this.service.name;
    if(this.service.employee == "teacher"){
      this.profilePic = "assets/images/teacher.jpg";
    }else{
      this.profilePic = "assets/images/student.jpg";
    }
    this.noti = this.service.notiList;
    this.lengthnoti = this.noti.length;
    console.log(this.lengthnoti);
    

  }
  onClick(){
    this.service.name = "";
    this.service.username = "";
    this.service.obj = ""
    this.router.navigateByUrl('/loginPage');
  }
  onClicknoti(index:string){
    this.service.nowSubject = this.service.notiSBID[index];
    console.log(this.service.nowSubject);
    this.router.navigateByUrl('/mainPage/addCourse');
  }

}
