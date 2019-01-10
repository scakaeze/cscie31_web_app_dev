import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SinglepostComponent } from './singlepost/singlepost.component';


const routes:Routes=[
  {path:'', redirectTo: '/homepage', pathMatch: 'full'},
  {path:'homepage', component: HomepageComponent},
  {path:'homepage/:id', component: SinglepostComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SinglepostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
