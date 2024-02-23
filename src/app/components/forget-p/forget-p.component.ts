import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forget-p',
  templateUrl: './forget-p.component.html',
  styleUrls: ['./forget-p.component.css'],
})
export class ForgetPComponent implements OnInit {
  email: string = '';

ngOnInit(): void {
  
}
  constructor(private auth: AuthService) {}
  
  forgetPassword() {
    this.auth.forgetPassword(this.email);
    this.email='';

  }
}
