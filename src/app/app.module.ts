import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { SearhStudentComponent } from './searh-student/searh-student.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import {HomeService} from './home/home.service'
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './global.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { CourseService } from './add-course/course.service';
import { SearchStudentService } from './search-student.service';
import { MymodalComponent } from './add-course/mymodal/mymodal.component';
import { MymodalhomeComponent } from './home/mymodalhome/mymodalhome.component';
import { ModalCourseService } from './add-course/modal-course.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlayerService } from './video-player/video-player.service';

const routes: Routes = [   
  { path: 'loginPage', component: LoginComponent },
  { path: 'mainPage', component: MainpageComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: 'addCourse', component: AddCourseComponent},
    { path: 'searchStudent', component: SearhStudentComponent },
    { path: 'videoPlayer', component: VideoPlayerComponent }
  ]},  
  { path: '', redirectTo: '/loginPage', pathMatch: 'full' }
 ]; 

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    SearhStudentComponent,
    HomeComponent,
    LoginComponent,
    MymodalComponent,
    MymodalhomeComponent,
    MainpageComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  entryComponents:[
    MymodalComponent,
    MymodalhomeComponent
  ],
  providers: [HomeService,
    GlobalService,
    CourseService,
    SearchStudentService,
    VideoPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
