import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Present } from '../models/Present.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentService {

  constructor(private httpClient: HttpClient) { }

  private reloadPresentsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  reloadPresents$: Observable<boolean> = this.reloadPresentsSubject.asObservable();

  getPresents(): Observable<Present[]>{
    let url = 'https://localhost:44345/api/presents/GetPresents';
    return this.httpClient.get<Present[]>(url);
  }

  getPresentById(number: number) : Observable<Present>{
    let url = 'https://localhost:44345/api/Presents/Get/' + number;
    return this.httpClient.get<Present>(url);
  }

  savePresent(present: Present) :Observable<boolean>{
    let url = 'https://localhost:44345/api/presents/UpdatePresents';
    return this.httpClient.put<boolean>(url, present);
  }

  addPresent(present: Present) :Observable<number> {
    let url = 'https://localhost:44345/api/presents/AddPresents';
    return this.httpClient.post<number>(url, present)
  }
  deletePresent(number: number) :Observable<boolean> {
    let url = 'https://localhost:44345/api/presents/DeletePresents/'+number;
    return this.httpClient.delete<boolean>(url)
  }

  setReloadPresent(){
    let flag = this.reloadPresentsSubject.value;
    this.reloadPresentsSubject.next(!flag);
  }

}
