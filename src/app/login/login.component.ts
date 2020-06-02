import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  show:boolean; //show when invalid value

  constructor(private service:GlobalService,private router:Router) {
    
   }

  onClick():void{
    // for test
    if(this.username == "1"){
      this.show = true;
      this.service.setUserAccount(this.username,"jk");
      this.router.navigateByUrl('/mainPage/home');
      this.service.employee = "teacher";
      this.service.status = true;
      this.service.getNotification("1").subscribe();
    }else{

    //ใช้งานจริง
      this.service.checkInfo(this.username,this.password).subscribe(result => {
        if(result){
          this.service.status = false;
          console.log("login c: "+ result);
          // this.name = this.service.obj.displayname_en;
          // console.log(this.name);
          this.service.employee = "student";
          this.router.navigateByUrl('/mainPage/home');
          this.service.getNotification(this.username).subscribe();
        }else{
          this.show = true;
          this.router.navigateByUrl('/loginPage');
          
        }
      });
    }
  }
  ngOnInit(): void {
    this.service.name = "";
    this.service.username = "";
  }

}
