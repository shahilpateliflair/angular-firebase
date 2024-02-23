import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getSpecificEmail(): string {
    throw new Error('Method not implemented.');
  }
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  private isauthentication = false;

  authentication(): boolean {
    return this.isauthentication;
  }

  private userEmailKey = 'userEmail';
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        // this.router.navigate(['/dashboard']);
        localStorage.setItem(this.userEmailKey, email);
        if (res.user?.emailVerified == true) {
          if (email == 'shahilkumarpatel93@gmail.com') {
            localStorage.setItem(this.userEmailKey, email);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', 'true');
            this.isauthentication = true;
          } else {
            this.router.navigate(['/userd']);
            localStorage.setItem(this.userEmailKey, email);
            localStorage.setItem('token', 'true');
            this.isauthentication = true;
          }
        } else {
          alert('first verify your email');
        }
      },
      (err) => {
        alert(err.message);

        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        // console.log(res,"gvbhbj bhvbj")
        alert('signup successfully');

        this.router.navigate(['/login']);
        this.SendVerficationEmail(res.user);
      },
      (err) => {
        alert('something went wrong');

        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(
      (res) => {
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  forgetPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify']);
      },
      (err) => {
        alert('something went Wrong');
      }
    );
  }

  SendVerficationEmail(user: any) {
    this.fireauth.currentUser
      .then((u) => u?.sendEmailVerification())
      .then(
        (res: any) => {
          alert('first check your mail');
        },
        (err: any) => {
          alert(
            'Something Went Wrong. Not able to send mail to registered Email.'
          );
        }
      );
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); //forcefully access
    return this.fireauth
      .signInWithPopup(provider)
      .then((res) => {
        const email = res.user?.email;
        // Store the user's email in localStorage

        if (email) {
          if (email == 'shahilkumarpatel93@gmail.com') {
            localStorage.setItem(this.userEmailKey, email);
            this.router.navigate(['dashboard']);
            localStorage.setItem('token', 'true');

            this.isauthentication = true;
          } else {
            this.router.navigate(['/userd']);
            localStorage.setItem(this.userEmailKey, email);
            localStorage.setItem('token', 'true');

            this.isauthentication = true;
          }
          localStorage.setItem('token', JSON.stringify(res.user?.uid));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  getUserEmail() {
    return localStorage.getItem(this.userEmailKey) || '';
  }
}
