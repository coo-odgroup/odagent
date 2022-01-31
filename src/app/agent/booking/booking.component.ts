import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationdataService } from '../../services/locationdata.service';
import { Router } from '@angular/router';
import { NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { formatDate, Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {Constants} from '../../constant/constant' ;
import { CommonService  } from '../../services/common.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit { 

  public searchForm: FormGroup;
  submitted = false;

  public keyword = 'name';
  swapdestination:any;
  swapsource:any;
  source: any;
  source_id: any;
  destination: any;
  destination_id: any;
  entdate: any;

  search:any;
  location_list:any;
  formatter:any;

  myDate:any = new Date();
  sourceData:any;
  destinationData:any;

  constructor(private router: Router,
    private spinner: NgxSpinnerService ,
    private fb: FormBuilder,
    private locationService: LocationdataService,
    public dtconfig: NgbDatepickerConfig,
    private location: Location,
    private notify: NotificationService,
    private common : CommonService
    ) { 

      const data={
        user_id:Constants.MASTER_SETTING_USER_ID
      };

      this.common.getCommonData(data).subscribe(
        resp => {

            const current = new Date();
            this.dtconfig.minDate = { year: current.getFullYear(), month: 
            current.getMonth() + 1, day: current.getDate() };

            let maxDate = current.setDate(current.getDate() + resp.data.common.advance_days_show); 

            const max = new Date(maxDate);
            this.dtconfig.maxDate = { year: max.getFullYear(), month: 
              max.getMonth() + 1, day: max.getDate() };


        });

      
      this.locationService.all().subscribe(
        res=>{

          if(res.status==1)
          { 
            this.location_list =res.data;
         }
          else{ 
            this.notify.notify(res.message,"Error");
          }
            
        });

          

      this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          map((term) =>
            term === ''
              ? []
              : this.location_list
                  .filter(
                    (v) =>
                      v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                      (v.synonym!='' && v.synonym!=null && v.synonym.toLowerCase().indexOf(term.toLowerCase()) > -1)
                  )
                  .slice(0, 10)
          )
        );

    this.formatter = (x: { name: string }) => x.name;               

  const current = new Date();
  this.dtconfig.minDate = { year: current.getFullYear(), month: 
   current.getMonth() + 1, day: current.getDate() };
      
      this.searchForm = fb.group({
        source: ['', Validators.required],
        destination: ['', Validators.required],
        entry_date: ['', Validators.required],
      });
  }

  submitForm() {  

       
    if(this.searchForm.value.source==null || this.searchForm.value.source==''){

      this.notify.notify("Enter Source !","Error");

    }

    else if(this.searchForm.value.destination==null || this.searchForm.value.destination==""){

      this.notify.notify("Enter Destination !","Error");
    }

    else if(this.searchForm.value.entry_date==null || this.searchForm.value.entry_date==""){

      this.notify.notify("Enter Journey Date !","Error");

    }

    else{     

      let dt = this.searchForm.value.entry_date;

      if(dt.month < 10){
        dt.month = "0"+dt.month;
      }
      if(dt.day < 10){
        dt.day = "0"+dt.day;
      }

      this.searchForm.value.entry_date= [dt.day,dt.month,dt.year].join("-");
      
      if(!this.searchForm.value.source.name){
        this.notify.notify("Select Valid Source !","Error");        
        
        return false;
      }

      if(!this.searchForm.value.destination.name){
        this.notify.notify("Select Valid Destination !","Error"); 
        
        return false;
      }

     let dat = this.searchForm.value.entry_date;

    
     this.listing(this.searchForm.value.source,this.searchForm.value.destination,dat);

    
    }
  }

  tabChange(val){
    document.getElementById(val).focus();
    document.getElementById(val).click();
  }

  listing(s:any,d:any,dt: any){
   
    this.locationService.setSource(s);
    this.locationService.setDestination(d);
    this.locationService.setDate(dt); 
    this.router.navigate(['agent/listing']);
  }

  swap(){

    if(this.searchForm.value.source){
      this.swapdestination=  this.searchForm.value.source
    }

    if(this.searchForm.value.destination){
      this.swapsource= this.searchForm.value.destination; 
    }
    
  }
    
  ngOnInit(): void {   
  }
}

