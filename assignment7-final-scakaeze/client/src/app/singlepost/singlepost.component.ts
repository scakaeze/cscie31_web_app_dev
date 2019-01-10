import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css'],
  providers: [PostService]
})
export class SinglepostComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private postService:PostService) { }

  ngOnInit() {
    this.getPost();
  }

  post:any = {};

  getPost(): void{
    const param = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(param)
      .subscribe((post)=>{
        this.post = post;
    });
  }

  updatePost(obj:any):void{
    this.post.topic = obj.topic;
    this.post.content = obj.content;
    this.postService.updatePost(this.post._id, this.post)
      .subscribe((result)=>{
        location.reload();
      });
  }

  deletePost(){
    if (confirm("Confirm Deleting of: " + this.post.topic)){
      console.log("deleting" + this.post.id);
      this.postService.deletePost(this.post._id)
        .subscribe((deleted)=>{
          alert("Post: " + this.post.topic + " has been deleted");
          location.href = "/#/";
        });
    }
  }
}
