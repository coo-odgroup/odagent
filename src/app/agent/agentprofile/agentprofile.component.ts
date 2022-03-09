import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusOperatorService} from '../../services/bus-operator.service';
import { AgentprofileService} from '../../services/agentprofile.service';


import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-agentprofile',
  templateUrl: './agentprofile.component.html',
  styleUrls: ['./agentprofile.component.scss']
})
export class AgentprofileComponent implements OnInit {
  ModalHeading: string;
  ModalBtn: string;
  modalReference: NgbModalRef;
  public form: FormGroup;
  validIFSC: string;
  profileDetails: any=[];
  
  
  constructor(
    private spinner: NgxSpinnerService ,
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder, 
    private busOperatorService:BusOperatorService,
    private aps:AgentprofileService,

    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.ModalHeading = "Add New Location";
    this.ModalBtn = "Update";
  }
  checkIfsc()
   {
     let ifsc=this.form.value.ifsc_code;
     if(ifsc!="")
     {
       this.busOperatorService.getIFSC(ifsc).subscribe(
 
         resp => {
           this.validIFSC=resp.ADDRESS + ',' +resp.STATE;
         }
         ,
         error => {
           this.validIFSC="INVALID VALID IFSC CODE";
           
         }
       );
     }
     else
     {
       this.validIFSC="";
     }
     
   }

  ngOnInit(): void {
    this.spinner.show();
    this.form = this.fb.group({
      user_id: localStorage.getItem('USERID'),
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      pwd_check: [null],
      password: [null],
      location: [null, Validators.compose([Validators.required])],
      adhar_no: [null, Validators.compose([ Validators.required,Validators.minLength(12),Validators.maxLength(12)])],
      pancard_no: [null, Validators.compose([Validators.required])],
      organization_name: [null,Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
      town: [null, Validators.compose([Validators.required])],      
      landmark: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required])],
      branch_name: [null],
      bank_acc_name: [null],
      bank_name: [null],
      ifsc_code: [null],
      bank_account_no: [null],
      upi_id: [null],
      
    }); 
   

    this.user_details();
    
  }
  
  user_details()
  {
    const data = {
      user_id : localStorage.getItem('USERID'),
    };
    this.aps.agentProfile(data).subscribe(
      res => {
        //console.log(res.data[0]);
        this.profileDetails=res.data[0];
        this.form.controls['name'].setValue(this.profileDetails.name);
        this.form.controls['email'].setValue(this.profileDetails.email);
        this.form.controls['phone'].setValue(this.profileDetails.phone);
        // this.form.controls['password'].setValue(this.profileDetails.password);
        this.form.controls['location'].setValue(this.profileDetails.location);
        this.form.controls['adhar_no'].setValue(this.profileDetails.adhar_no);
        this.form.controls['pancard_no'].setValue(this.profileDetails.pancard_no);
        this.form.controls['organization_name'].setValue(this.profileDetails.organization_name);
        this.form.controls['address'].setValue(this.profileDetails.address);
        this.form.controls['area'].setValue(this.profileDetails.street);
        this.form.controls['town'].setValue(this.profileDetails.city);
        this.form.controls['landmark'].setValue(this.profileDetails.landmark);
        this.form.controls['pincode'].setValue(this.profileDetails.pincode);
        this.form.controls['branch_name'].setValue(this.profileDetails.branch_name);
        this.form.controls['bank_acc_name'].setValue(this.profileDetails.name_on_bank_account);
        this.form.controls['bank_name'].setValue(this.profileDetails.bank_name);
        this.form.controls['ifsc_code'].setValue(this.profileDetails.ifsc_code);
        this.form.controls['bank_account_no'].setValue(this.profileDetails.bank_account_no);
        this.form.controls['upi_id'].setValue(this.profileDetails.upi_id);       
      }
    );
    this.spinner.hide();

  }

  updateDetails()
  {
    // console.log(this.form.value);
    // return;
    this.spinner.show();

    const data = {
      user_id : localStorage.getItem('USERID'),
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      pwd_check: this.form.value.pwd_check,
      password: this.form.value.password,
      location: this.form.value.location,
      adhar_no: this.form.value.adhar_no,
      pancard_no: this.form.value.pancard_no,
      organization_name: this.form.value.organization_name,
      address: this.form.value.address,
      street: this.form.value.area,
      city: this.form.value.town,      
      landmark: this.form.value.landmark,
      pincode: this.form.value.pincode,
      branch_name: this.form.value.branch_name,
      name_on_bank_account: this.form.value.bank_acc_name,
      bank_name: this.form.value.bank_name,
      ifsc_code: this.form.value.ifsc_code,
      bank_account_no: this.form.value.bank_account_no,
      upi_id:this.form.value.upi_id,
    };

    // console.log(data);
    // // update
    this.aps.update(data).subscribe(
      res => {
        if (res.status == 1) {
          this.notificationService.addToast({ title: 'Success', msg: res.message, type: 'success' });
           this.resetAttr();
           this.user_details();
           this.spinner.hide();
           this.modalReference.close();
        }
        else {
          this.notificationService.addToast({ title: 'Error', msg: res.message, type: 'error' });
          this.spinner.hide();
        }
      });
      
  }

  resetAttr()
  {
    this.form = this.fb.group({
      user_id: localStorage.getItem('USERID'),
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      pwd_check: [null],
      password: [null],
      location: [null, Validators.compose([Validators.required])],
      adhar_no: [null, Validators.compose([ Validators.required,Validators.minLength(12),Validators.maxLength(12)])],
      pancard_no: [null, Validators.compose([Validators.required])],
      organization_name: [null,Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
      town: [null, Validators.compose([Validators.required])],      
      landmark: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required])],
      branch_name: [null],
      bank_acc_name: [null],
      bank_name: [null],
      ifsc_code: [null],
      bank_account_no: [null],
      upi_id: [null],
      
    }); 
  }

  
  OpenModal(content) {
    this.modalReference = this.modalService.open(content, { scrollable: true, size: 'xl' });
  }
 
}
