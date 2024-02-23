import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { PlatformLocation } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-userd',
  templateUrl: './userd.component.html',
  styleUrls: ['./userd.component.css'],
})
export class UserdComponent implements OnInit {
  detail?: any[];
  detailData: any[] = [];
  detailEmail: string = '';
  email: any;

  ngOnInit(): void {
    this.detailEmail = this.auth.getUserEmail();

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('/detail', (ref) => ref.where('email', '==', user.email))
          .valueChanges()
          .subscribe((Detail) => {
            this.detail = Detail;
          });
      }
    });
  }

  constructor(
    private auth: AuthService,
    private plateformlocaton: PlatformLocation,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    history.pushState(null, '', location.href);
    this.plateformlocaton.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  logoutUserDashboard() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
