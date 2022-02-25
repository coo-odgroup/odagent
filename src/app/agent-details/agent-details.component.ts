
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AgentDetailsService } from '../services/agent-details.service';
import { NotificationService } from '../services/notification.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
  providers: [NgbAlertConfig, NgbModalConfig, NgbModal]
})
export class AgentDetailsComponent implements OnInit {

  agentform: FormGroup;
  submitted = false;
  userId: any;
  alert: any = '';
  constructor(public router: Router,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
    private notify: NotificationService,
    private agentDetailsService: AgentDetailsService,
    private alertConfig: NgbAlertConfig,
    config: NgbModalConfig
  ) {

    alertConfig.type = 'success';
    alertConfig.dismissible = false;

    this.agentform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required],
      adhar_no: ['', Validators.required],
      pancard_no: ['', Validators.required],
      organization_name: [''],
      address: [''],
      street: [''],
      landmark: [''],
      city: [''],
      pincode: [''],
      name_on_bank_account: [''],
      bank_name: [''],
      ifsc_code: [''],
      bank_account_no: [''],
      branch_name: [''],
      upi_id: [''],
    })

  }

  get f() { return this.agentform.controls; }

  onSubmit() {
    // console.log(this.agentform.value);return;
    // this.spinner.show();

    this.submitted = true;

    // stop here if form is invalid
    if (this.agentform.invalid) {
      return;
    } else {
      const param = {
        userId: this.userId,
        name: this.agentform.value.name,
        email: this.agentform.value.email,
        password: this.agentform.value.password,
        location: this.agentform.value.location,
        adhar_no: this.agentform.value.adhar_no,
        pancard_no: this.agentform.value.pancard_no,
        organization_name: this.agentform.value.organization_name,
        address: this.agentform.value.address,
        street: this.agentform.value.street,
        landmark: this.agentform.value.landmark,
        city: this.agentform.value.city,
        pincode: this.agentform.value.pincode,
        name_on_bank_account: this.agentform.value.name_on_bank_account,
        bank_name: this.agentform.value.bank_name,
        ifsc_code: this.agentform.value.ifsc_code,
        bank_account_no: this.agentform.value.bank_account_no,
        branch_name: this.agentform.value.branch_name,
        upi_id: this.agentform.value.upi_id,
      };

      this.agentDetailsService.submit(param).subscribe(
        res => {

          if (res.status == 1) {
            this.notify.notify('Agent Registration Successful', "Success");
            this.router.navigate(['login']);
          }
          else {
            this.notify.notify(res.message, "Error");
          }
        },
      );

    }
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('USERID');
    this.agentform = this.fb.group({  
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      location: [null, Validators.compose([Validators.required])],
      adhar_no: [null, Validators.compose([ Validators.required,Validators.minLength(12),Validators.maxLength(12)])],
      pancard_no: [null, Validators.compose([Validators.required])],
      organization_name: [null,Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      street: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],      
      landmark: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required])],
      branch_name: [null],
      name_on_bank_account: [null],
      bank_name: [null],
      ifsc_code: [null],
      bank_account_no: [null],
      upi_id: [null],
      
    }); 
  }
  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onCancel() {
    this.router.navigate(['signup']);
  }
}
