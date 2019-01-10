import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  postList = [
    {name:'Stephen Akaeze',title: 'Captain America'},
    {name:'Stephen Akaeze',title: 'Spiderman'},
    {name:'Stephen Akaeze',title: 'Hulk'},
    {name:'Stephen Akaeze',title: 'Erik Killmonger'}
  ]
}
