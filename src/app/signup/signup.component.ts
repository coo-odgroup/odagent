import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import {Signup} from '../model/signup';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import{Constants} from '../constant/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public signupRecord:Signup;

  constructor(public router: Router,protected fb:FormBuilder, private signupService: SignupService, private notificationService: NotificationService,private notify: NotificationService) {}

   
  ngOnInit() {
    this.form = this.fb.group({
      phone: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
    });  
  }
  ResetForm()
  {
    this.form = this.fb.group({
      phone: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
    });
  }
  check_credentials()
  {
    const data={
      phone:this.form.value.phone,
    };
    this.signupService.signup(data).subscribe(
      res=>{
                 
        if(res.status==1){ 
          this.signupRecord=res.data;
          //console.log(res.data);
          localStorage.setItem("USERRECORDS",JSON.stringify(this.signupRecord));
          localStorage.setItem("USERID",JSON.stringify(this.signupRecord.id));
          localStorage.setItem("PHONE",JSON.stringify(this.signupRecord.phone));
          this.router.navigate(['otp']);
          
        }else{
          this.notify.notify(res.message,"Error");
        }    
      },
    );
  }

}
