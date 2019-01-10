import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private http:HttpClient) {}

  private apiurl = environment.apiurl;

  httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  listPosts(){
    return this.http.get(this.apiurl + '/api/wakanda');
  }

  getPost(id){
    return this.http.get(this.apiurl + '/api/wakanda/' + id);
  }

  deletePost(id){
    return this.http.delete(this.apiurl + '/api/wakanda/' + id);
  }

  updatePost(id, data){
    return this.http.put(this.apiurl + '/api/wakanda/' + id, data);
  }

  createPost(post:any){
    console.log(post);
    return this.http.post(this.apiurl + '/api/wakanda/', post, this.httpOptions);
  }
}
