import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { CourseService } from '../add-course/course.service';
import { Course } from '../add-course/Course';
import { Router } from '@angular/router';
import { PostInfo } from './PostInfo';
import { VideoPlayerService } from './video-player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  path:string;
  list:Course[];
  filename:string;
  fid:string;//เอาไว้ไปหาคอมเม้น
  comment:string;
  postby:string;
  postlist:PostInfo[];

  constructor(private global:GlobalService,private courseService:CourseService,private router:Router,private vdoservice:VideoPlayerService) { 
    this.comment = "";
  }

  ngOnInit() {
    this.postlist = [];
    if(this.global.username == undefined || this.global.username== ""){
      this.router.navigateByUrl('/loginPage');
    }else{
      this.fid = this.courseService.fid;
      console.log("vdoservice: "+this.fid);
      this.path = this.global.getPath();
      // this.path = "http://localhost/"+this.path;
      this.path = "http://178.128.90.185:8081/vdo/"+this.path;
      this.list = this.courseService.contentList;
      this.filename = this.courseService.filename;
      console.log(this.path);
      this.vdoservice.showComment(this.fid).subscribe(result =>{
        if(result){
          this.postlist = this.vdoservice.postlist;
          console.log("show all: "+this.postlist.length);
        }else{
          this.postlist = [];
        }
      });
      console.log(this.vdoservice.postlist);
      this.postby = this.global.name;
    }
    console.log(this.fid);
  }
  setPath(newPath:string,newName:string,fid:string){
    this.path = newPath;
    this.filename = newName;
    this.fid = fid;
    console.log("set path: "+this.fid);
    this.vdoservice.showComment(this.fid).subscribe(result =>{
      if(result){
        this.postlist = this.vdoservice.postlist;
        console.log("setPath: "+this.postlist.length);
      }else{
        this.postlist = [];
      }
    });
  }
  keyDownFunction(event){
    if(event.keyCode == 13 && this.comment != ""){
      console.log(this.comment);
      this.vdoservice.addComment(this.fid,this.global.name,this.comment).subscribe(result=>{
        if(result){
          this.postlist = this.vdoservice.postlist;
          console.log("key down: "+this.postlist.length);
          this.comment = "";
        }
      });
    }
  }
}
