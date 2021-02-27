import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: firebase.default.User
  request: AngularFirestoreCollection;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private firebaseApp: FirebaseApp) {
    afAuth.currentUser.then(user => {
      if (user != null) {
        this.user = user;
        localStorage.setItem("isLogin", "1");
      }
    });
    this.request = this.db.collection("requests");
  }

  isAuthenticated() {
    return localStorage.getItem("isLogin") == "1";
  }

  async login(email: string, password: string) {
    localStorage.setItem("isLogin", "1");
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    localStorage.setItem("isLogin", "0");
    localStorage.removeItem("user");
    return await this.afAuth.signOut();
  }

  async resetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  async addRequest(email: string) {
    return await this.request.add({ email, time: Date.now(), read: false });
  }


  getUser() {
    return this.db.collection('users').doc(JSON.parse(localStorage.getItem("user")).uid).get;
  }

  updatePassword(currentPassword: string, newPassword: string) {
    this.afAuth.currentUser.then(res => {
      let email = JSON.parse(localStorage.getItem('user')).email;
      var cred = firebase.default.auth.EmailAuthProvider.credential(email, currentPassword);
      res.reauthenticateWithCredential(cred).then(_ => {
        res.updatePassword(newPassword).then(_ => {
          console.log("Password changed successfully.");
        });
      }).catch(err => {
        alert(err.message);
        console.log(err);
      });
    });
  }

  updateEmail(currentEmail: string, newEmail: string, password: string) {
    this.afAuth.currentUser.then(res => {
      var cred = firebase.default.auth.EmailAuthProvider.credential(currentEmail, password);
      res.reauthenticateWithCredential(cred).then(_ => {
        res.updateEmail(newEmail).then(_ => {
          console.log("Email changed successfully.");
        });
      }).catch(err => {
        alert(err.message);
        console.log(err);
      });
    });
  }

}
