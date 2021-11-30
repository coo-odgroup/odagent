import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationdataService } from '../services/locationdata.service';
import { NotificationService } from '../services/notification.service';
import { PopularRoutesService } from '../services/popular-routes.service';
import { TopOperatorsService } from '../services/top-operators.service';
import { OfferService } from '../services/offer.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from '../constants/global-constants';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../services/seo.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-home',
 // templateUrl:GlobalConstants.ismobile? './home.component.mobile.html':'./home.component.html',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  @Input() masterSettingRecord;
  @Input() offers: any;
  
  public searchForm: FormGroup;
  submitted = false;

  public keyword = 'name';
  url_path :any=[];
  position = 'bottom-right';
  swapdestination:any;
  swapsource:any;
  bannerImage = '';
  source: any;
  source_id: any;
  destination: any;
  destination_id: any;
  entdate: any;

  popular_routes: any=[];
  topOperators:any=[];
  

  active = 1;

  search:any;
  location_list:any;
  formatter:any;

  //Bus_Offers:any=[];
  //Festive_Offers:any=[];
  activeTab:any='Bus Offers';
  offerList: any = [];
  Offers: any = [];

  meta_title = '';
  meta_keyword = '';
  meta_description = '';

  seolist:any;
  currentUrl: any;

  
  
    constructor(private router: Router,private _fb: FormBuilder,
      private locationService: LocationdataService,
      private dtconfig: NgbDatepickerConfig,
      private notify: NotificationService,
      private spinner: NgxSpinnerService,
      private popularRoutesService:PopularRoutesService,
      private topOperatorsService: TopOperatorsService,
      private offerService:OfferService,
      private sanitizer: DomSanitizer,
      private commonService: CommonService,
      private titleService: Title, 
      private metaService: Meta,
      private seo:SeoService,
      private Common: CommonService,
      private location: Location
      
      ) {

        this.currentUrl = location.path().replace('/','');
        this.seo.seolist(this.currentUrl);

       
        localStorage.removeItem('bookingdata');
        localStorage.removeItem('busRecord');
        localStorage.removeItem('genderRestrictSeats');
        localStorage.removeItem('source');
        localStorage.removeItem('source_id');
        localStorage.removeItem('destination');
        localStorage.removeItem('destination_id');
        localStorage.removeItem('entdate');

        this.popularRoutesService.all().subscribe(
          res=>{
            if(res.status==1)
            { 
              this.popular_routes =res.data;
            }              
          });


          this.topOperatorsService.all().subscribe(
            res=>{
              if(res.status==1)
              { 
                this.topOperators =res.data;
              }
                
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
                            v.synonym.toLowerCase().indexOf(term.toLowerCase()) > -1
                        )
                        .slice(0, 10)
                )
              );

          this.formatter = (x: { name: string }) => x.name;               

        const current = new Date();
        this.dtconfig.minDate = { year: current.getFullYear(), month: 
         current.getMonth() + 1, day: current.getDate() };

      
      this.searchForm = _fb.group({
        source: ['', Validators.required],
        destination: ['', Validators.required],
        entry_date: ['', Validators.required],
      });
  
    }


    operator_detail(url:any){
      this.router.navigate(['operator/'+url]);     
    }

  swap(){

    if(this.searchForm.value.source){
      this.swapdestination=  this.searchForm.value.source
    }

    if(this.searchForm.value.destination){
      this.swapsource= this.searchForm.value.destination; 
    }
    
  }

  sourceData:any;
  destinationData:any;

  popularSearch(sr:any,ds:any){
    this.spinner.show();

      this.location_list.filter((itm) =>{
        if(sr===itm.name){
          this.sourceData=itm;
        }

        if(ds===itm.name){
          this.destinationData=itm;
        }

      });

      this.spinner.hide();

      let dt=(<HTMLInputElement>document.getElementById("todayDate")).value;
      this.listing(this.sourceData,this.destinationData,dt);

  }

  listing(s:any,d:any,dt: any){
   
    this.locationService.setSource(s);
    this.locationService.setDestination(d);
    this.locationService.setDate(dt); 
    this.router.navigate(['/listing']);
  }


  getImagePath(slider_img :any){
    let objectURL = 'data:image/*;base64,'+slider_img;
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
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

  getOffer(typ:any){

    this.activeTab=typ;
    this.offerList = this.Offers.filter(data => data.occassion == typ);
  }

  ngOnInit() {

    this.spinner.show();
    this.Common.getPathUrls().subscribe( res=>{          
      if(res.status==1){  
        this.url_path=res.data[0];        
      }    
    });

    this.seo.deafultmeta_description.subscribe((s:any) => { this.meta_description = s});
    this.seo.deafultmeta_title.subscribe((s:any) => { this.meta_title = s});
    this.seo.deafultmeta_keyword.subscribe((s:any) => { this.meta_keyword = s});

    this.searchForm = this._fb.group({
      source: [null],
      destination: [null],
      entry_date: [null]
    });

    const data={
      bus_operator_id:GlobalConstants.BUS_OPERATOR_ID
    };  

    this.commonService.getCommonData(data).subscribe(
      resp => {
        this.masterSettingRecord=resp.data['common'][0];
        this.masterSettingRecord.banner=resp.data['banner'][0].banner_image;  
        this.bannerImage = this.url_path.banner_url+this.masterSettingRecord.banner;
      });

    this.offerService.Offers(data).subscribe(
      res=>{

        if(res.status==1)
        { 
          this.Offers =res.data.allOffers;
          this.getOffer(this.activeTab);
        }   
        this.spinner.hide();           
      }); 
  }

}



