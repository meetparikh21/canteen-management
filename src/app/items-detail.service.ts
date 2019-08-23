import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDetail } from './ItemDetail';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemsDetailService {

  _url = '/assets/Data/items.json';

  constructor(private http : HttpClient,
              private firestore: AngularFirestore) { }

  getItemDetails() : Observable<ItemDetail[]> {
    return this.http.get<ItemDetail[]>(this._url);
  }

  getItemList(){
    return this.firestore.collection('/itemList',ref => ref).snapshotChanges();
  }
}
