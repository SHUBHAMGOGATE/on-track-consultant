import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { CollectionReference, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userlistref:AngularFirestoreCollection;
  userlist;
  constructor(private afauth:AngularFireAuth,private db:AngularFirestore) { 
    this.userlistref=db.collection('/users');
    this.userlist=this.userlistref.valueChanges();
  }
  addUser(user:User){
    this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password).then(
      value=>{
        return this.userlistref.doc(value.user.uid).set({
          username:user.username,
          email:user.email,
          dateofbirth:user.dateofbirth,
          weight:user.weight,
          height:user.height
        })
      }
    ).then(value=>{
      console.log(value)
    })
  }

  addDiet(diet:Object){
    return this.db.collection('/diet').add(Object.assign({},diet))
  }
}

export interface User{
  username:string;
  password?:string;
  email:string;
  dateofbirth:Date;
  weight:number;
  height:number;
}
