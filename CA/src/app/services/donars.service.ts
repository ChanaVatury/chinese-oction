import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donar } from '../models/Donar.model';

@Injectable({
  providedIn: 'root'
})
export class DonarsService {

  constructor(private httpClient: HttpClient) { }

  private reloadDonarsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  reloadDonars$: Observable<boolean> = this.reloadDonarsSubject.asObservable();

  getDonars(): Observable<Donar[]>{
    let url = 'https://localhost:44345/api/Donars/GetDonars';
    return this.httpClient.get<Donar[]>(url);
  }

  getDonarById(id: number) : Observable<Donar>{
    let url = 'https://localhost:44345/api/Donars/Get/' + id;
    return this.httpClient.get<Donar>(url);
  }

  saveDonar(donar: Donar) :Observable<boolean>{
    let url = 'https://localhost:44345/api/Donars/UpdateDonars';
    return this.httpClient.put<boolean>(url, donar); 
  }

  addDonar(donar: Donar) :Observable<number> {
    let url = 'https://localhost:44345/api/Donars/AddDonars';
    return this.httpClient.post<number>(url, donar)
  }
  deleteDonar(number: number) :Observable<boolean> {
    let url = 'https://localhost:44345/api/Donars/DeleteDonars/'+number;
    return this.httpClient.delete<boolean>(url)
  }

  setReloadDonar(){
    let flag = this.reloadDonarsSubject.value;
    this.reloadDonarsSubject.next(!flag);
  }
}
