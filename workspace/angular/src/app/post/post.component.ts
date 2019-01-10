import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

  @Input() post;
  @Input() coursename;
  @Output() upvotedEvent = new EventEmitter<string>();

  votes:number = 0;



  upvote(topic):void{
    console.log("Confirmed");
    this.votes+=1;
    this.upvotedEvent.emit(topic);
  }



}
