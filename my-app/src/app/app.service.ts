import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getAllData() {
    return this.http.get('http://localhost:3000/user');
  }

  saveData(data:any) {
    return this.http.post('http://localhost:3000/user/',data);
  }

  updateData (data:any, id:any) {
    return this.http.put('http://localhost:3000/user/'+id,data)
  }

  removeData(id:any) {
    return this.http.delete('http://localhost:3000/user/'+id)
  }
}
