import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Login} from '../model/login';
import {RoleService} from '.././services/role.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import{Constants} from '../constant/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loginRecord:Login;
  usertypes: [] ;

  public saveUsername:boolean;
  public onSaveUsernameChanged(value:boolean){
      this.saveUsername = value;
  }

  constructor(public router: Router,protected fb:FormBuilder, private loginService: LoginService, private notificationService: NotificationService,private notify: NotificationService,private roleService: RoleService) {

    this.roleService.getRoles().subscribe(
      res=>{
        this.usertypes=res.data;
      }
    );
  }
 
  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      user_type: [null ],
    });  
  }
  ResetForm()
  {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      user_type: [null],
    });
  }
  check_credentials()
  {
    const data={
      email:this.form.value.email,
      password:this.form.value.password,
      user_type:3, 
    };
    // console.log(data);
    // return;

    this.loginService.checkLogin(data).subscribe(

      res=>{
                 
        if(res.status==1){ 
          this.loginRecord=res.data;
          localStorage.setItem("USERRECORDS",JSON.stringify(this.loginRecord));
          localStorage.setItem("USERID",JSON.stringify(this.loginRecord.id)); 
          localStorage.setItem("ROLE_ID",JSON.stringify(this.loginRecord.role_id)); 
          localStorage.setItem("USERNAME",this.loginRecord.name); 
          localStorage.setItem("USER_BUS_OPERATOR_ID",''); 
          if(this.loginRecord.role_id==4)
          {
            localStorage.setItem("USER_BUS_OPERATOR_ID",this.loginRecord.user_bus_operator.bus_operator.id); 
          }
          // var ROLE_ID = localStorage.getItem("ROLE_ID");
          // var USERID = localStorage.getItem("USERID");
          // console.log("ROLE ID : "+ROLE_ID+", USER ID : "+USERID);
          this.router.navigate(['dashboard/landing']);
        }else{
          this.notify.notify(res.message,"Error");
        }    
      },
      error => {
       this.notify.notify(error.error.message,"Error");
      }
    );
  }

}
