import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Login} from '../model/login';
import {RoleService} from '.././services/role.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import{Constants} from '../constant/constant';
import { NgxSpinnerService } from "ngx-spinner";
import { MustMatch } from "../helpers/must-match.validator";


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public otpForm: FormGroup;
  public resetForm: FormGroup;
  

  submitted=false;
  Otpsubmitted=false;
  verifyStatus=false;
  Resetsubmitted=false;
  
  OtpData:any;

  constructor(public router: Router,protected fb:FormBuilder, private loginService: LoginService, private notificationService: NotificationService,private notify: NotificationService,private roleService: RoleService,private spinner: NgxSpinnerService) { }

  get f() { return this.forgotPasswordForm.controls; }

  get fo() { return this.otpForm.controls; }

  get rf() { return this.resetForm.controls; }

  
  onSubmitResetPassword(){

    this.Resetsubmitted=true;

    if(this.resetForm.invalid){
      return;
   }else{

    this.spinner.show();

    const data={
      email:this.OtpData.email,
      password:this.resetForm.value.password
    };

    this.loginService.resetPassword(data).subscribe(
      res=>{
        if(res.status==1){ 
          this.notify.notify("Reset Password is successful","Success");
          this.router.navigate(['login']);
        }else{
          this.notify.notify(res.message,"Error");
        } 

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
       this.notify.notify(error.error.message,"Error");
      }
    );
    

   }

  }

  onSubmitOtp() {

   

    this.Otpsubmitted=true;

    if(this.otpForm.invalid){
       return;
    }else{

      this.spinner.show();

      const data={
        email:this.OtpData.email,
        otp:this.otpForm.value.otp
      };

      this.loginService.verifyOtp(data).subscribe(
        res=>{
          if(res.status==1){ 
            this.verifyStatus=true;
            localStorage.setItem("OtpData",JSON.stringify(this.OtpData));
          }else{
            this.notify.notify(res.message,"Error");
          } 

          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
         this.notify.notify(error.error.message,"Error");
        }
      );
    }

 }

  onSubmit() {

    this.submitted=true;

    if(this.forgotPasswordForm.invalid){
       return;
    }else{

      const data={
        email:this.forgotPasswordForm.value.email
      };

      this.spinner.show();

      this.loginService.sendOtp(data).subscribe(

        res=>{                   
          if(res.status==1){ 
            this.OtpData=res.data;
            this.notify.notify("OTP has been sent","Success");
          }else{
            this.notify.notify(res.message,"Error");
          } 
          
         this.spinner.hide();
          
        },
        error => {
         this.spinner.hide();
         this.notify.notify(error.error.message,"Error");
        }
      );
    }

 }

  ngOnInit(): void {

    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });  

    this.otpForm = this.fb.group({
      otp: [null, Validators.compose([Validators.required])],
    });  


    this.resetForm = this.fb.group({
      password: [null, Validators.compose([Validators.required])],
      confirm_password: [null, Validators.compose([Validators.required])],
    },{ 
      validator: MustMatch('password', 'confirm_password')
    });  

  }

}
