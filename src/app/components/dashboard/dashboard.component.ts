import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Detail } from 'src/app/model/detail';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  detailsList: Detail[] = [];
  detailObj : Detail ={
    id: '',
    name: '',
    email: '',
    mobile: ''
  }
  id: string = '';
  name: string = '';
  email: string = '';
  mobile: string = '';
  // plateformlocaton: any;

  constructor(private auth: AuthService,private data:DataService,private plateformlocaton: PlatformLocation) {
    history.pushState(null, '', location.href);
    this.plateformlocaton.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
  
 
  
  ngOnInit(): void {
   
    this.getAllDetails();
  }

  logOutDashaboard() {
    this.auth.logout();
    window.location.href = '/login';
  }

  getAllDetails(){
    this.data.getAllDetail().subscribe(res=>{
      this.detailsList =res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id=e.payload.doc.id;
        return data;
      })
    },err =>{
      alert("something error for fetch");
    })
  }

  resetForm(){
    this.id= '';
    this.name  = '';
    this.email = '';
    this.mobile = '';

  }
  addDetail(){
    if (this.name == '' || this.email == '' || this.mobile == '') {
      alert('fill all the field ');
    }

    this.detailObj.id='';
    this.detailObj.name=this.name;
    this.detailObj.email=this.email;
    this.detailObj.mobile=this.mobile;

    this.data.addDetail(this.detailObj);
    this.resetForm();
  }

  

  deleteDetail(detail:Detail){
    if(window.confirm('are u sure want to delete?'+ detail.email)){
      
    this.data.deleteDetail(detail)
    }
  }
  

}
