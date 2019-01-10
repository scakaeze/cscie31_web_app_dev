import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [PostService]
})
export class HomepageComponent implements OnInit {

  constructor(private postService:PostService){}

  ngOnInit(){
    this.updatePostList();
  }

  postList = null;

  coursename = 'CSCI-E31: Introduction to Web Development';
  totalVotes:number = 0;
  mostRecentVotedOn:string ='No vote yet';

  /*getPostCount(){
    return this.postList.length;
  }*/

  handleUpvoted(e):void{
    console.log("app-component gets upvoted: " + e);
    this.totalVotes+=1;
    this.mostRecentVotedOn = e;
  }

  updatePostList():void{
    this.postService.listPosts().subscribe((posts)=>{
      this.postList = posts;
    });
  }

}
