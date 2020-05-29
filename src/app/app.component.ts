import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  name:string;
  username:string;
  constructor(private service:GlobalService){
    this.name = service.name;
    this.username = service.username;
  }
  
}
