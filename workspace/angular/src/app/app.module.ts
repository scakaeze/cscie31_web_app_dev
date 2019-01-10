import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PostComponent } from './post/post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { NewpostComponent } from './newpost/newpost.component';

const routes:Routes=[
  {path:'', redirectTo: '/homepage', pathMatch: 'full'},
  {path:'homepage', component: HomepageComponent},
  {path:'post/:id', component: PostdetailComponent }
]



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HomepageComponent,
    PostdetailComponent,
    NewpostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
