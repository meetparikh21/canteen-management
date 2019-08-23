import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginService } from './../login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model : any = {};
  public employees = [];
  public isUserValid : boolean =  false;
  returnUrlUser: string;
  returnUrlAdmin: string;
  employeeList : any;
  id : string;
  currentEmployee : any;
  currentEmployeeName : any;

  constructor(db : AngularFireDatabase,
              private loginService : LoginService, 
              private router : Router,
              private route: ActivatedRoute,
              private firestore: AngularFirestore
              ) { }
  
  ngOnInit() {
    this.returnUrlUser = this.route.snapshot.queryParams['returnUrlUser'] || 'app-user-item-list';
    this.returnUrlAdmin = this.route.snapshot.queryParams['returnUrlAdmin'] || 'app-home';
  }
  
  onSubmit(){
     this.employeeList = this.loginService.getEmployees(this.model).subscribe(data=>{
      if(data.length > 0){
         
        console.log("data--",data[0].payload.doc.data());
        this.currentEmployee = data[0].payload.doc.data();
        localStorage.setItem("data", this.currentEmployee);
        this.currentEmployeeName = this.currentEmployee.name;

        if(this.currentEmployee.role == 'admin'){
          this.router.navigate([this.returnUrlAdmin]);
        }
        else{
          this.router.navigate([this.returnUrlUser]);
        }
      }
    });
  }
 
}
