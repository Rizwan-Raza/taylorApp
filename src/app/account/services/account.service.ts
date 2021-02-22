import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: firebase.default.User
  request: AngularFirestoreCollection;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
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

}
