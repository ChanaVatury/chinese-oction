import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  private reloadUsersSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  reloadUsers$: Observable<boolean> = this.reloadUsersSubject.asObservable();

  getUsers(): Observable<User[]>{
    let url = 'https://localhost:44345/api/Users/GetUsers';
    return this.httpClient.get<User[]>(url);
  }

  getUserById(id: number) : Observable<User>{
    let url = 'https://localhost:44345/api/Users/Get/' + id;
    return this.httpClient.get<User>(url);
  }

  saveUser(User: User) :Observable<boolean>{
    let url = 'https://localhost:44345/api/Users/UpdateUsers';
    return this.httpClient.put<boolean>(url, User); 
  }

  addUser(User: User) :Observable<number> {
    let url = 'https://localhost:44345/api/Users/AddUsers';
    return this.httpClient.post<number>(url, User)
  }

  login(User:User) :Observable<User> {
    let url = 'https://localhost:44345/api/Users/login';
    return this.httpClient.post<User>(url,User)
  }
  
  deleteUser(number: number) :Observable<boolean> {
    let url = 'https://localhost:44345/api/Users/DeleteUsers/'+number;
    return this.httpClient.delete<boolean>(url)
  }

  setReloadUser(){
    let flag = this.reloadUsersSubject.value;
    this.reloadUsersSubject.next(!flag);
  }
}
