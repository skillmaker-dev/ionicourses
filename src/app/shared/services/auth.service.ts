import { Injectable, NgZone } from '@angular/core';
import { User } from '../../models/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public firestore: AngularFirestore,
    public fireauth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  SignIn(email: any, password: any) {
    if (email.length == 0 || password.length == 0) {
      this.showAlert("Please fill all fields", "Error")
      return
    }

    return this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.showAlert(error.message, "Error")

      });
  }
  SignUp(email: any, password: any) {
    if (email.length == 0 || password.length == 0) {
      this.showAlert("Please fill all fields", "Error")
      return
    }
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.SendVerificationMail();

        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.showAlert(error.message, "Error")

      });
  }

  SignOut() {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['authentication']);
    });
  }

  SendVerificationMail() {
    return this.fireauth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }

  ResetPassword(passwordResetEmail: any) {
    return this.fireauth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.showAlert('Password reset email sent, Please check your inbox.', "Success");
      })
      .catch((error) => {
        this.showAlert(error.message, "Error")
      });
  }
  AuthLogin(provider: any) {
    return this.fireauth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.showAlert(error.message, "Error")

      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async showAlert(message: string, header: string) {
    const alert = await alertController.create({
      header: header,
      message: message.split('.')[0],
      buttons: ['Ok'],
    });

    await alert.present();
  }
}