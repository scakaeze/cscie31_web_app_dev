import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [PostService]
})
export class NewpostComponent implements OnInit {

  constructor(private postService:PostService) { }

  ngOnInit() {
  }

  @Output() newPost = new EventEmitter();



  post:any = {};

  savePost(newphotoForm): void {

    let newPost = {
      "firstname" : this.post.firstname,
      "lastname" : this.post.lastname,
      "topic" : this.post.topic,
      "content" : this.post.content,
    };

    let newJsonPost = JSON.stringify(newPost);

    this.postService.createPost(newJsonPost)
      .subscribe((post)=>{
        console.log(post);
        this.newPost.emit();
        newphotoForm.reset();
      });
  }



}
