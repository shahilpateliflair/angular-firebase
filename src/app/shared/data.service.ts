import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Detail } from '../model/detail';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  addDetail(detail: Detail) {
    detail.id = this.afs.createId();
    return this.afs.collection('/detail').add(detail);
  }

  getAllDetail() {
    return this.afs.collection('/detail').snapshotChanges();
  }

  deleteDetail(detail: Detail) {
    return this.afs.doc('/detail/'+detail.id).delete();
  }

  updateDetail(detail:Detail){
    this.deleteDetail(detail);
    this.addDetail(detail);
  }
  
}
