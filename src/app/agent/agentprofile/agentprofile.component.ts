import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusOperatorService} from '../../services/bus-operator.service';


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

  public form: FormGroup;
  validIFSC: string;
  constructor(
    private spinner: NgxSpinnerService ,
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder, 
    private busOperatorService:BusOperatorService,

    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.ModalHeading = "Add New Location";
    this.ModalBtn = "Save";
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
    this.form = this.fb.group({
      user_id: localStorage.getItem('USERID'),
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      password: [null, Validators.compose([Validators.required,Validators.minLength(6)])],
      location: [null, Validators.compose([Validators.required])],
      adhar_no: [null, Validators.compose([ Validators.required,Validators.minLength(12),Validators.maxLength(12)])],
      pancard_no: [null, Validators.compose([Validators.required])],
      organization_name: [null,Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
      town: [null, Validators.compose([Validators.required])],      
      landmark: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required])],
      branch_name: [null, Validators.compose([Validators.required])],
      bank_acc_name: [null, Validators.compose([Validators.required])],
      bank_name: [null, Validators.compose([Validators.required])],
      ifsc_code: [null, Validators.compose([Validators.required])],
      bank_account_no: [null, Validators.compose([Validators.required])],
      upi_id: [null],
      
    }); 
    console.log(this.form.value);
  }
  
  user_details()
  {

  }

}
