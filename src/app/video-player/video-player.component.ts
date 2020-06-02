import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { CourseService } from '../add-course/course.service';
import { Course } from '../add-course/Course';
import { Router } from '@angular/router';
import { PostInfo } from './PostInfo';
import { VideoPlayerService } from './video-player.service';
import { replyInfo } from './replyInfo';

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
  replystatus:boolean;
  reply:string;
  qastatus:string;
  owner:string = this.global.username;

  constructor(private global:GlobalService,private courseService:CourseService,private router:Router,private vdoservice:VideoPlayerService) { 
    this.comment = "";
  }

  ngOnInit() {
    this.replystatus = false;
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
      this.vdoservice.showReply().subscribe(result => {
        console.log(result);
        for(let i=0; i< this.vdoservice.postlist.length; i++){
          let tmp = this.vdoservice.postlist[i].id;
          const rs :replyInfo[] = result.filter(function(f){
            return f.id == tmp;
          });
          this.vdoservice.postlist[i].reply = rs;
          console.log(rs);
        }
      });
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
          this.comment = "";
        }
      });
    }
  }
  onClick(qaid:string){
    this.replystatus = true;
    this.qastatus = qaid;
  }
  keyDownReply(event,qaid:string){
    if(event.keyCode == 13 && this.reply != ""){
      console.log(qaid);
      this.replystatus = false;
      this.vdoservice.addReply(qaid,this.global.name,this.reply).subscribe();
      this.qastatus = "0";
      this.reply = "";
    }
  }
  clickToDelete(rid:string,index1:any,index2:any){
    this.vdoservice.deleteReply(rid,index1,index2).subscribe();
    console.log(rid);
  }
  clickToDeleteAll(qaid:string,index:any){
    this.vdoservice.deleteComment(qaid,index).subscribe();
    console.log(qaid);
  }
}
