import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './IEmployee';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = '/assets/Data/employee-list.json';
  employeeList : any;
  id : string;
  model : any;

  constructor(private http : HttpClient,
              private firestore: AngularFirestore) {}

  // getEmployees() : Observable<IEmployee[]> {
  //   return this.http.get<IEmployee[]>(this._url);
  // }

  getEmployees(model){
    console.log(typeof model.password);
    return this.firestore.collection('/employeeDetails',ref => ref.where('empId', '==', parseInt(model.employeeId))
    .where('password', '==', model.password)).snapshotChanges();
  }
}
