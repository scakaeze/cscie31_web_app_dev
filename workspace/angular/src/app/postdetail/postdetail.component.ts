import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css'],
  providers: [PostService]
})
export class PostdetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private postService:PostService){}

  ngOnInit() {
    this.getPost();
  }

  post:any = {};
  editing:boolean = false;

  setEditMode(mode):void{
    this.editing = (mode ? true : false);
  }

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
    if (confirm("Are you sure you want to delete " + this.post.topic)){
      console.log("deleteting" + this.post.id);
      this.postService.deletePost(this.post._id)
        .subscribe((deleted)=>{
          alert("Post" + this.post.topic + " has been deleted");
          location.href = "/#/";
        });
    }
  }

}
