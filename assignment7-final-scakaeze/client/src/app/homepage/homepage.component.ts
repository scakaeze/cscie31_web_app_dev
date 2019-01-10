import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [PostService]
})
export class HomepageComponent implements OnInit {

  constructor(private postService:PostService) { }

  ngOnInit() {
    this.listPosts();
  }

  postList:any = {};

  listPosts(){
    this.postService.listPosts()
      .subscribe((posts)=>{
        this.postList = posts;
        console.log("Posts acquired");
    });
  }
}
