import { Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl} from '@angular/forms';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { LocationdataService } from '../../services/locationdata.service';
import { ListingService } from '../../services/listing.service';
import { FilterOptionsService } from '../../services/filter-options.service';
import { SeatLayoutService } from '../../services/seat-layout.service';
import { FilterService } from '../../services/filter.service';
import { GetSeatPriceService } from '../../services/get-seat-price.service';
import { BoardingDropingPointService } from '../../services/boarding-droping-point.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatsLayout } from '../../model/seatslayout';
import { Buslist } from '../../model/buslist';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { DatePipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {Constants} from '../../constant/constant' ;
import { CommonService  } from '../../services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Lightbox } from 'ngx-lightbox';





export const DATEPICKER_VALUE_ACCESSOR =  {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe]
})



export class SearchComponent  implements ControlValueAccessor {  

  selectedDate: any;
  disabled = false;

  _albums = [];

  // Function to call when the date changes.
  onChange = (date?: Date) => {};

  // Function to call when the date picker is touched
  onTouched = () => {};

  writeValue(value: Date) {
    if (!value) return;
    this.selectedDate = {
      year: value.getFullYear(),
      month: value.getMonth(),
      day: value.getDate()
    }
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Write change back to parent
  onDateChange(value: Date) {
    this.onChange(value);
  }

  // Write change back to parent
  onDateSelect(value: any) {
    this.onChange(new Date(value.year, value.month - 1, value.day));
  }

  source :any;
  destination :any;
  source_id :any;
  destination_id :any;
  entdate :any;
  jrnyDt:any;
  buslist :Buslist[] =[];
  buslistRecord :Buslist;
  currentSeatlayoutIndex:boolean=false;

  busId: any;

  busIds: any=[];

  seatsLayouts :  SeatsLayout[];
  seatsLayoutRecord :  SeatsLayout;  

  public filterForm: FormGroup;

  keyword = 'name'  
  public searchForm: FormGroup;
  public seatForm: FormGroup ;

  public Source: string = 'Source';
  public Destination: string = 'Destination';

  swapdestination:any;
  swapsource:any;

  public source_list:  any = [];
  public destination_list:  any = []; 

  busTypes :any=[];
  seatTypes :any=[];
  boardingPoints :any=[];
  droppingPoints :any=[];
  busOperators :any=[];
  amenities :any=[];

  LowerberthArr: any=[];
  UpperberthArr: any=[];

  boardingPointArr:any=[];
  droppingPointArr:any=[];
  Lowerberth: any;
  Upperberth: any;

  selectedLB:any=[];
  selectedUB:any=[];
  PriceArray:any=[];

  
  maxSeat:number=0;
  checkedIndex:any=0;

  url_path : any;
  totalfound: any = 0 ;

  colarr:any[]=[];

  selectedBoard:any;
  selectedDrop:any;

  seatlayoutShow: any='';
  safetyshow: any='';
  busPhotoshow: any='';
  reviewShow: any='';
  policyShow: any='';
  amenityShow: any='';
  btnstatus :any='hide';

  isShown: boolean = false ; // hidden by default

  seatLoader : boolean = false ;

  search:any;
  location_list:any;
  formatter:any;
  currentUrl:any;

  prevDate:any;
  nextDate:any;
  maxAllowedDate:any=new Date();
  show = 5;
 
  constructor(
        private spinner: NgxSpinnerService ,
        private router: Router,
        private fb : FormBuilder , 
        config: NgbNavConfig,
        private locationService: LocationdataService,
        private listingService : ListingService, 
        private filterOptionsService : FilterOptionsService,
        private sanitizer: DomSanitizer, private filterService :FilterService,
        private seatLayoutService: SeatLayoutService,
        private getSeatPriceService:GetSeatPriceService,
        private boardingDropingPointService:BoardingDropingPointService,
        private notify: NotificationService,
        private dtconfig:NgbDatepickerConfig,
        private datePipe: DatePipe,
        private common : CommonService,
        private _lightbox: Lightbox

     ) {

     
        
          this.buslistRecord = {} as Buslist;

          this.seatsLayouts=[];
          this.seatsLayoutRecord={} as SeatsLayout;

          this.seatsLayoutRecord.visibility=false;

          config.destroyOnHide = false;
          config.roles = false;

          this.searchForm = this.fb.group({
            source: [null, Validators.compose([Validators.required])],
            destination: [null, Validators.compose([Validators.required])],
            entry_date: [null, Validators.compose([Validators.required])],
          });
        
          this.filterForm = this.fb.group({
            price: [0],
            busType: this.fb.array([]),
            seatType: this.fb.array([]),
            boardingPointId: this.fb.array([]),
            dropingingPointId: this.fb.array([]),
            operatorId: this.fb.array([]),
            amenityId: this.fb.array([]),
          })

          this.seatForm = this.fb.group({
            boardingPoint: [null, Validators.compose([Validators.required])],
            droppingPoint: [null, Validators.compose([Validators.required])],
            Lowerberth:this.fb.array([]),   
            Upperberth:this.fb.array([])   
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
                          ( v.synonym!='' && v.synonym!=null && v.synonym.toLowerCase().indexOf(term.toLowerCase()) > -1)
                      )
                      .slice(0, 10)
              )
            );

        this.formatter = (x: { name: string }) => x.name; 

  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  
  swap(){

    if(this.searchForm.value.source){
      this.swapdestination=  this.searchForm.value.source
    }

    if(this.searchForm.value.destination){
      this.swapsource= this.searchForm.value.destination; 
    }
    
  }

  submitSeat(){
      if (this.seatForm.valid) {

        let Lowerberth=this.seatForm.value.Lowerberth;
        let Upperberth=this.seatForm.value.Upperberth;

       
       Lowerberth.forEach((item, index) => {
          if (index !== Lowerberth.findIndex(i => i == item) || item == null) 
          {
            
            Lowerberth.splice(index, 1);
          }

      });

      Upperberth.forEach((item, index) => {
        if (index !== Upperberth.findIndex(i => i == item) || item == null ) 
        {
          Upperberth.splice(index, 1);
        }

       });  

     
       this.selectedLB.forEach((item, index) => {
        if (index !== this.selectedLB.findIndex(i => i == item)) 
        {
          this.selectedLB.splice(index, 1);
        }

       });

       this.selectedUB.forEach((item, index) => {
        if (index !== this.selectedUB.findIndex(i => i == item)) 
        {
          this.selectedUB.splice(index, 1);
        }
       });
      
      const bookingdata={
        LowerBerthSeats:this.selectedLB,
        Lowerberth:Lowerberth,
        UpperBerthSeats:this.selectedUB,
        Upperberth: Upperberth,
        boardingPoint:this.seatForm.value.boardingPoint,
        busId:this.busId,
        PriceArray:this.PriceArray,
        droppingPoint:this.seatForm.value.droppingPoint
      }

      localStorage.setItem('bookingdata',JSON.stringify(bookingdata));
      localStorage.setItem('busRecord',JSON.stringify(this.buslistRecord));

      //console.log(JSON.stringify(bookingdata));
      //console.log(JSON.stringify(this.buslistRecord));
      
      this.router.navigate(['agent/bookTicket']);     
    }else{

      if(this.seatForm.value.boardingPoint==null || this.searchForm.value.boardingPoint==''){

        this.notify.notify("Select Boarding Point !","Error");
      }

      else if(this.seatForm.value.droppingPoint==null || this.searchForm.value.droppingPoint==''){
        this.notify.notify("Select Dropping Point !","Error");
      }

      else if(this.seatForm.value.Lowerberth==null || this.searchForm.value.Lowerberth=='' || this.seatForm.value.Upperberth==null || this.searchForm.value.Upperberth==''){
        this.notify.notify("Select Seat !","Error");
      }


    }
  }

  

  updateUpperberth(e:any){
    const Upperberth: FormArray = this.seatForm.get('Upperberth') as FormArray;  
    if (e.target.checked) {

      if(this.maxSeat!=0 && this.checkedIndex < this.maxSeat ){
        this.checkedIndex++;
        Upperberth.push(new FormControl(e.target.value));
       }else{             
        e.target.checked = false;
       }

     
    } else {
      let i: number = 0;
      Upperberth.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          this.checkedIndex--; 
          Upperberth.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.getPriceOnSeatSelect();

  }

  
  

  updateLowerberth(e:any){
    const Lowerberth: FormArray = this.seatForm.get('Lowerberth') as FormArray;  
    if (e.target.checked) {
       if(this.maxSeat!=0 &&  this.checkedIndex < this.maxSeat ){
        this.checkedIndex++;
        Lowerberth.push(new FormControl(e.target.value));
       }else{             
        e.target.checked = false;
       }
      
    } else {
      let i: number = 0;
      Lowerberth.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          this.checkedIndex--; 
          Lowerberth.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.getPriceOnSeatSelect();
  }

  

  
  getPriceOnSeatSelect(){

    

    const SeatPriceParams={
      seater: this.seatForm.value.Lowerberth,
      sleeper: this.seatForm.value.Upperberth,
      destinationId: this.destination_id,
      sourceId: this.source_id,
      busId: this.busId
    }

    let params='entry_date='+this.entdate;
        let seaterparam='';
        let sleeperparam='';

        let lbIds=SeatPriceParams.seater; 
        let ubIds=SeatPriceParams.sleeper; 


        let genderRestrictSeatarray: any=[];
        let Seatdistance=0;

    if(this.seatsLayoutRecord.lower_berth){

        this.selectedLB = this.seatsLayoutRecord.lower_berth.filter((itm) =>{

          if(lbIds.indexOf(itm.id.toString()) > -1){
            seaterparam +='&seater[]='+itm.id;

            ///////// logic for seat select gender restriction

            let prevGender=null;

             this.seatsLayoutRecord.lower_berth.filter((at) =>{  
              if( itm.colNumber == at.colNumber && 
                  (itm.rowNumber - at.rowNumber == -1 || itm.rowNumber - at.rowNumber == 1)  
                  && at.seatText!='' && itm.seatText !=at.seatText && at.Gender && at.Gender!='' ){                

                if(prevGender!=null){
                  if(prevGender != at.Gender){
                    let indexNum =genderRestrictSeatarray.findIndex((i)=> {
                      return (i.seat_name == itm.id);
                    });

                    //genderRestrictSeatarray.splice(indexNum,1);

                    const sst={
                      "seat_name" : itm.id,
                      "canSelect" : 'none'
                    };
                    genderRestrictSeatarray.push(sst);

                  }
                }else{
                  if(at.Gender=='F' || at.Gender=='M'){
                    const sst={
                      "seat_name" : itm.id,
                      "canSelect" : at.Gender
                    };
                    genderRestrictSeatarray.push(sst);
                  }
                }

                prevGender=at.Gender;                

              } 
            });

             
          } 
          return lbIds.indexOf(itm.id.toString()) > -1; 
    
        }).map(itm => itm.seatText);      

    }

   
   
    if(this.seatsLayoutRecord.upper_berth){ 

        this.selectedUB = this.seatsLayoutRecord.upper_berth.filter((t) =>{  
          if(ubIds.indexOf(t.id.toString()) > -1){
            sleeperparam +='&sleeper[]='+t.id; 

             ///////// logic for seat select gender restriction

             let prevSleepGender=null;
            
            this.seatsLayoutRecord.upper_berth.filter((at) =>{  
              if( t.colNumber == at.colNumber && 
                (t.rowNumber - at.rowNumber == -1 || t.rowNumber - at.rowNumber == 1)  
                && at.seatText!='' && t.seatText !=at.seatText && at.Gender  && at.Gender!='' ){ 

                if(prevSleepGender!=null){

                  if(prevSleepGender != at.Gender){
                    let indexNum =genderRestrictSeatarray.findIndex((i)=> {
                      return (i.seat_name == t.id);
                    });

                    genderRestrictSeatarray.splice(indexNum,1);

                    const sst={
                      "seat_name" : t.id,
                      "canSelect" : 'none'
                    };
                    genderRestrictSeatarray.push(sst);

                  }
                }else{
                  if(at.Gender =='F' || at.Gender =='M'){
                    const sst={
                      "seat_name" : t.id,
                      "canSelect" : at.Gender
                    };
                    genderRestrictSeatarray.push(sst);
                  }
                }


               prevSleepGender=at.Gender;     


              } 
            });

          }
          return ubIds.indexOf(t.id.toString()) > -1; 
        }).map(t => t.seatText);

    }

    //console.log(genderRestrictSeatarray);

    localStorage.setItem('genderRestrictSeats', JSON.stringify(genderRestrictSeatarray));

    this.spinner.show();
   
    if(this.selectedLB.length != 0 || this.selectedUB.length != 0){

      params +='&destinationId='+SeatPriceParams.destinationId+'&sourceId='+SeatPriceParams.sourceId+'&busId='+SeatPriceParams.busId
      if(seaterparam){
        params += seaterparam;
      }

      if(sleeperparam){
        params += sleeperparam;
      }

      this.getSeatPriceService.getprice(params).subscribe(
        res=>{
        // console.log(res);        
          this.PriceArray=res.data[0];  
          this.spinner.hide();
          // this.buslistRecord.seaterPrice =res.data[0].seaterPrice; 
          // this.buslistRecord.sleeperPrice =res.data[0].sleeperPrice; 
        });

       

    }else{
      this.spinner.hide();
      this.PriceArray=[];
    }

    
     
  }

  updateBusType(e:any) {
    const busType: FormArray = this.filterForm.get('busType') as FormArray;
  
    if (e.target.checked) {
      busType.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      busType.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          busType.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.submitFilterForm();
  }

  updateSeatType(e:any) {
    const seatType: FormArray = this.filterForm.get('seatType') as FormArray;
  
    if (e.target.checked) {
      seatType.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      seatType.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          seatType.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.submitFilterForm();
  }


  search_prev(){

    this.seatsLayoutRecord.visibility =false;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';
    this.checkedIndex=0;

    this.totalfound=0;
    this.buslist=[];

    this.entdate = this.prevDate; 
    this.getbuslist();
    this.isShown = false ; 
    this.setPrevNextDate(this.entdate);
    this.showformattedDate(this.entdate);

  }

  search_next(){

    this.seatsLayoutRecord.visibility =false;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';

    this.checkedIndex=0;

    this.totalfound=0;
    this.buslist=[];
    
    this.entdate = this.nextDate; 
    this.getbuslist();
    this.isShown = false ; 
    this.setPrevNextDate(this.entdate);
    this.showformattedDate(this.entdate);


  }

  
  updateBoarding(e : any){
    
    const boardingPointId: FormArray = this.filterForm.get('boardingPointId') as FormArray;
  
    if (e.target.checked) {
      boardingPointId.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      boardingPointId.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          boardingPointId.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitFilterForm();
  }

  updateDropping(e : any){    
    const dropingingPointId: FormArray = this.filterForm.get('dropingingPointId') as FormArray;
  
    if (e.target.checked) {
      dropingingPointId.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      dropingingPointId.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          dropingingPointId.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitFilterForm();
  }

  updateOperator(e : any){    
    const operatorId: FormArray = this.filterForm.get('operatorId') as FormArray;
  
    if (e.target.checked) {
      operatorId.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      operatorId.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          operatorId.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitFilterForm();
  }

  updateAmenity(e : any){  

    const amenityId: FormArray = this.filterForm.get('amenityId') as FormArray;
  
    if (e.target.checked) {
      amenityId.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      amenityId.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          amenityId.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.submitFilterForm();

  }

  updatePrice(e: any){

    
    let price = this.filterForm.get('price') as FormControl;

    if (e.target.checked) {
      price.patchValue(e.target.value);
      
    }else{
      price.patchValue(0);
    }

    this.submitFilterForm();

  }

  resetFilterForm(){
    this.filterForm = this.fb.group({
      price: [0], 
      busType: this.fb.array([]),
      seatType: this.fb.array([]),
      boardingPointId: this.fb.array([]),
      dropingingPointId: this.fb.array([]),
      operatorId: this.fb.array([]),
      amenityId: this.fb.array([]),
    });

    this.submitFilterForm();
  }

  submitFilterForm() {

    this.spinner.show();

    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';


   let filterparam='';
    let et= this.entdate;

   filterparam ='price='+this.filterForm.value.price+'&sourceID='+this.source_id+
    '&destinationID='+this.destination_id+
    '&entry_date='+et;

   if(this.filterForm.value.busType){

    this.filterForm.value.busType.forEach((e: any) => {

      filterparam +='&busType[]='+e;   
    });

   }

   if(this.filterForm.value.seatType){

    this.filterForm.value.seatType.forEach((e: any) => {

      filterparam +='&seatType[]='+e;   
    });
   }
  
   if(this.filterForm.value.boardingPointId){

    this.filterForm.value.boardingPointId.forEach((e: any) => {

      filterparam +='&boardingPointId[]='+e;   
    });
   }

   if(this.filterForm.value.dropingingPointId){

    this.filterForm.value.dropingingPointId.forEach((e: any) => {

      filterparam +='&dropingingPointId[]='+e;   
    });
   }

   if(this.filterForm.value.operatorId){

    this.filterForm.value.operatorId.forEach((e: any) => {

      filterparam +='&operatorId[]='+e;   
    });
   }

   if(this.filterForm.value.amenityId){

    this.filterForm.value.amenityId.forEach((e: any) => {

      filterparam +='&amenityId[]='+e;   
    });

   }  
   
    this.filterService.getlist(filterparam).subscribe(
      res=>{
         this.buslist = res.data;
         this.totalfound = res.data.length;   
        
         this.spinner.hide();

      });

 }

  getSource(val: string){
    if(val.length == 0){
      this.source_list=[];
    }
    if(val.length >= 3){     
      this.locationService.all(val).subscribe(
        res=>{
            this.source_list = res.data;
        });
    } 
  }

  selectSource(item:any) {
    this.source_id =  item.id;
  }


  
  getDestination(val: string){

    if(val.length == 0){
      this.destination_list=[];
    }
    if(val.length >= 3){     
      this.locationService.all(val).subscribe(
        res=>{
            this.destination_list =res.data;
        });
    }
  }

  selectDestination(item:any) {
    this.destination_id =  item.id;
  }

  

  submitForm() {  

    this.seatsLayoutRecord.visibility =false;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';
    this.checkedIndex=0;

    this.totalfound=0;
    this.buslist=[];
    
    if (this.searchForm.valid) {

      if(!this.searchForm.value.source.name){
        this.notify.notify("Select Valid Source !","Error");  
        
        return false;
      }

      if(!this.searchForm.value.destination.name){
        this.notify.notify("Select Valid Destination !","Error"); 
        
        return false;
      }

      let dt = this.searchForm.value.entry_date;
      if(dt.month < 10){
        dt.month = "0"+dt.month;
      }
      if(dt.day < 10){
        dt.day = "0"+dt.day;
      }
      this.searchForm.value.entry_date= [dt.day,dt.month,dt.year].join("-");
    
      this.sourceData = this.searchForm.value.source;
      this.destinationData = this.searchForm.value.destination;
      this.entdate = this.searchForm.value.entry_date;     
      
      this.source_id=this.sourceData.id;
      this.destination_id=this.destinationData.id;
     
      this.locationService.setSource(this.sourceData);
      this.locationService.setDestination(this.destinationData);
      this.locationService.setDate(this.searchForm.value.entry_date);
      
      this.getbuslist();
      this.isShown = false ; 
      this.showformattedDate(this.searchForm.value.entry_date);
      this.setPrevNextDate(this.entdate);

    }
    else{

      if(this.searchForm.value.source==null || this.searchForm.value.source==''){

        this.notify.notify("Select Source !","Error");
     }

     else if(this.searchForm.value.destination==null || this.searchForm.value.destination==""){
      this.notify.notify("Select Destination !","Error");
     }

     else if(this.searchForm.value.entry_date==null || this.searchForm.value.entry_date==""){
      this.notify.notify("Select Journey Date !","Error");
     }
   }
  }

  getbuslist() { 

    this.busIds=[];
    this.spinner.show();
    
    this.listingService.getlist(this.sourceData.name,this.destinationData.name,this.entdate).subscribe(
      res=>{
        localStorage.setItem('source', this.sourceData.name);
        localStorage.setItem('source_id', this.sourceData.id);
        localStorage.setItem('destination', this.destinationData.name);
        localStorage.setItem('destination_id', this.destinationData.id);
        localStorage.setItem('entdate', this.entdate); 
              
        if(res.data){
          this.buslist = res.data; 
          this.totalfound = res.data.length; 

          if(this.totalfound>0){

            this.buslist.forEach((a) => {  
              this.busIds.push(a.busId);
            }); 

          }

          ///////// get filter options after getting bus list          
          this.filteroptions();

        }
        this.swapdestination=this.destinationData ;
        this.swapsource=this.sourceData ;

        this.spinner.hide();
      }
      );
  }  

  getseatlayout(){
    let bus_id=this.busId;
    this.seatLoader=true;
      this.seatLayoutService.getSeats(this.entdate,bus_id,this.source_id,this.destination_id).subscribe(
        res=>{   

          this.seatsLayouts[bus_id]= res.data;   
          this.seatsLayoutRecord= res.data;
          this.seatsLayoutRecord.visibility = true;
          this.createberth();       

        }); 
  }

  createberth(){
    if(this.seatsLayoutRecord.upper_berth){

      let upper_berth = this.seatsLayoutRecord.upper_berth;
      let row = this.seatsLayoutRecord.upperBerth_totalRows;
      let col = this.seatsLayoutRecord.upperBerth_totalColumns;

      if(upper_berth.length){
        
      for(let i=0; i < row;i++){  
        this.colarr=[];         
        for(let k=0; k < col;k++){
          upper_berth.forEach((a) => {  
            if(a.rowNumber== i && a.colNumber== k){
              this.colarr.push(a);
            }
          });               
        }
        this.UpperberthArr[i]=this.colarr;     
      }
     }

    }

    
    if(this.seatsLayoutRecord.lower_berth){

    let row2 = this.seatsLayoutRecord.lowerBerth_totalRows;
    let col2 = this.seatsLayoutRecord.lowerBerth_totalColumns;
    let lower_berth = this.seatsLayoutRecord.lower_berth; 
    
      if(lower_berth.length){
        for(let i=0; i < row2;i++){  
          this.colarr=[];         
          for(let k=0; k < col2;k++){
            lower_berth.forEach((a) => {  
              if(a.rowNumber== i && a.colNumber== k){
                this.colarr.push(a);
              }
            });               
          }
          this.LowerberthArr[i]=this.colarr;      
        } 
    }
  }


  this.seatLoader=false;

  }

 

  getBoardingDroppingPoints(){

    let bus_id=this.busId;

    this.boardingDropingPointService.getdata(bus_id,this.source_id,this.destination_id).subscribe(
      res=>{
       this.boardingPointArr=res.data[0].boardingPoints;
       this.droppingPointArr=res.data[0].droppingPoints;

       this.boardingPointArr.map((i:any) => { i.boardTime = i.boardingPoints + ' | ' + i.boardingTimes; return i; });
       this.droppingPointArr.map((i:any) => { i.dropTime = i.droppingPoints + ' | ' + i.droppingTimes; return i; });

       this.selectedBoard= this.boardingPointArr[0].boardTime;
       this.selectedDrop= this.droppingPointArr[0].dropTime;
      }); 
    
  }

  ShowLayout(id :any) {    

    
    this.seatForm = this.fb.group({
      boardingPoint: [null, Validators.compose([Validators.required])],
      droppingPoint: [null, Validators.compose([Validators.required])],
      Lowerberth:this.fb.array([]),   
      Upperberth:this.fb.array([])   
    }); 
    
    this.buslistRecord =this.buslist[id];
    this.maxSeat=this.buslistRecord.maxSeatBook;
    let currentBusId=this.buslist[id].busId;

    this.currentSeatlayoutIndex=true;
   
    let showbtn = document.getElementById('showbtn'+id).innerHTML;

    this.checkSeatHTML(id);    

    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';
    this.checkedIndex=0;

    if(this.seatsLayoutRecord.visibility== true){
       if(currentBusId!=this.busId){

        this.buslist.forEach((item, index) => { 
          
          if(id!=index){
            if(document.getElementById('showbtn'+index) != null){
              document.getElementById('showbtn'+index).innerHTML = 'View Seat';
            }
            
          }          
        }); 

        this.seatsLayoutRecord.visibility =true;
        this.seatlayoutShow=id;
       }
       else if(currentBusId==this.busId && showbtn == 'View Seat'){
        this.seatsLayoutRecord.visibility =true;
        this.seatlayoutShow=id;
       }
       else if(currentBusId==this.busId && showbtn == 'Hide Seat'){
        this.seatsLayoutRecord.visibility =false;
        this.seatlayoutShow='';
       }

    }else if(this.seatsLayoutRecord.visibility == false){
      this.seatsLayoutRecord.visibility =true;
      this.seatlayoutShow=id;
    }

    this.busId=this.buslistRecord.busId;
    this.LowerberthArr=[];
    this.UpperberthArr=[];
    this.PriceArray=[];
    this.droppingPointArr=[];
    this.boardingPointArr=[];
    this.selectedLB=[];
    this.selectedUB=[];

    if(currentBusId == this.busId){
    }else{

      this.seatForm = this.fb.group({
        boardingPoint: [null, Validators.compose([Validators.required])],
        droppingPoint: [null, Validators.compose([Validators.required])],
        Lowerberth:this.fb.array([]),   
        Upperberth:this.fb.array([])   
      });
      
    }

    this.getseatlayout();
    this.getBoardingDroppingPoints();
    
  }

  showAllAmenity(id:any){

    this.currentSeatlayoutIndex=false;


    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow=id;


   this.checkSeatHTML(id);


  }

  closeTab(id:any){
    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';
     this.checkSeatHTML(id);

  }

  checkSeatHTML(id:any){  

    if(this.currentSeatlayoutIndex==true){

      let showbtn = document.getElementById('showbtn'+id).innerHTML;

      if(showbtn == 'View Seat'){
        document.getElementById('showbtn'+id).innerHTML = 'Hide Seat';
      }
      if(showbtn =='Hide Seat'){
        document.getElementById('showbtn'+id).innerHTML = 'View Seat';
      }

    }else{
        for (var i = 0; i < this.totalfound; i++) {

          if(document.getElementById('showbtn'+i) != null){
            document.getElementById('showbtn'+i).innerHTML = 'View Seat';   
          }
                  
        }

    
    }
   
  }
 
  safety(id:any){
    this.currentSeatlayoutIndex=false;
    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow=id;
    this.busPhotoshow='';
    this.reviewShow='';
    this.policyShow='';
    this.amenityShow='';
    this.checkSeatHTML(id);

  }

  bus_pic(id:any){

    this.currentSeatlayoutIndex=false;

    this._albums=[];

    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';

    this.busPhotoshow=id;

    let busRecord= this.buslist[id];

    if(busRecord.busPhotos.length>0){

      busRecord.busPhotos.forEach((sf) => {

        if(sf.bus_image_1 !='' && sf.bus_image_1 != null ){

          const src = sf.bus_image_1;
          const caption = '';
          const thumb = sf.bus_image_1;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };   
          this._albums.push(album);

        }

        if(sf.bus_image_2 !='' && sf.bus_image_2 != null ){

          const src = sf.bus_image_2;
          const caption = '';
          const thumb = sf.bus_image_2;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };   
          this._albums.push(album);

        }

        if(sf.bus_image_3 !='' && sf.bus_image_3 != null ){

          const src = sf.bus_image_3;
          const caption = '';
          const thumb = sf.bus_image_3;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };   
          this._albums.push(album);

        }

        if(sf.bus_image_4 !='' && sf.bus_image_4 != null ){

          const src = sf.bus_image_4;
          const caption = '';
          const thumb = sf.bus_image_4;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };   
          this._albums.push(album);

        }

        if(sf.bus_image_5 !='' && sf.bus_image_5 != null ){

          const src = sf.bus_image_5;
          const caption = '';
          const thumb = sf.bus_image_5;
          const album = {
             src: src,
             caption: caption,
             thumb: thumb
          };   
          this._albums.push(album);

        }
       

      });

    } 

    this.reviewShow='';
    this.amenityShow='';
    this.policyShow='';

    this.checkSeatHTML(id);

  }

  reviews(id:any){

    this.currentSeatlayoutIndex=false;

    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow=id;
    this.amenityShow='';
    this.policyShow='';

    this.checkSeatHTML(id);

  }


  booking_policy(id:any){

    this.currentSeatlayoutIndex=false;

    this.seatsLayoutRecord.visibility =false;
    this.checkedIndex=0;
    this.seatlayoutShow='';
    this.safetyshow='';
    this.busPhotoshow='';
    this.reviewShow='';
    this.amenityShow='';
    this.policyShow=id;

    this.checkSeatHTML(id);
  }

  getImagePath(icon :any){  
     let objectURL = 'data:image/*;base64,'+icon  ;
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }

  getProfileImagePath(icon :any){  
   return this.sanitizer.bypassSecurityTrustResourceUrl(icon);
 }

  getContent(c:any){    
      return c;
  }

  filteroptions(){

   
    let busIDs ="";

    if(this.busIds.length>0){
    
      this.busIds.forEach((i) => {
        busIDs +="&busIDs[]= "+i;
      });

    }else{
      busIDs ="&busIDs[]= ";
    }

    this.filterOptionsService.getoptions(this.source_id,this.destination_id,busIDs).subscribe(
      res=>{ 
        this.busTypes = res.data[0].busTypes;        
        this.seatTypes = res.data[0].seatTypes;        
        this.boardingPoints = res.data[0].boardingPoints;  
        this.droppingPoints = res.data[0].dropingPoints;  
        this.busOperators = res.data[0].busOperator;  
        this.amenities = res.data[0].amenities;
      });      

  }

  toggleShow() {

    this.isShown = ! this.isShown;   
  }

  showformattedDate(date:any){
    if(date){

      let dt = date.split("-");
      let dd=new Date(dt[2]+'-'+dt[1]+'-'+dt[0]);
      this.jrnyDt = {
        year: dd.getFullYear(),
        month: dd.getMonth()+1,
        day: dd.getDate()
      }

    }
    

  }

  myDate:any = new Date();
  sourceData:any;
  destinationData:any;

  tabChange(val){
    document.getElementById(val).focus();
    document.getElementById(val).click();
  }

  ngOnInit() :void{ 

    this.common.getPathUrls().subscribe( res=>{          
      if(res.status==1){  
        this.url_path=res.data[0];        
      }    
    });
    
    this.locationService.currentsource.subscribe((s:any) => { this.sourceData = s});
    this.locationService.currentdestination.subscribe((d:any) => { this.destinationData = d });
    this.locationService.currententdate.subscribe(dat => { this.entdate = dat});

    if(this.sourceData==null  || this.destinationData==null || this.entdate=='' || this.entdate==null ){       
      this.router.navigate(['agent/booking']);
    }else{

      this.swapsource=this.sourceData;
      this.swapdestination=this.destinationData;

      this.source_id=this.sourceData.id;
      this.destination_id=this.destinationData.id;

      localStorage.setItem('source_id', this.sourceData.id);
      localStorage.setItem('destination_id', this.destinationData.id);

    
      this.showformattedDate(this.entdate);
      this.getbuslist();


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
  
            this.maxAllowedDate = this.maxAllowedDate.setDate(this.maxAllowedDate.getDate() + resp.data.common.advance_days_show); 
            this.maxAllowedDate = formatDate(this.maxAllowedDate,'dd-MM-yyyy','en_US'); 

            this.setPrevNextDate(this.entdate);
  
        });
        

      
    }

    
  }


  setPrevNextDate(entDate:any){     
    
    
    let dt = entDate.split("-");
    let dd=dt[2]+'-'+dt[1]+'-'+dt[0];
    let entdate = dd;

    let currentDate = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let entrdate = formatDate(new Date(entdate),'yyyy-MM-dd','en_US');

      let fentdate = new Date(entdate);

      if(this.maxAllowedDate == entDate){
        this.nextDate = ''; 
        this.prevDate = fentdate.setDate(fentdate.getDate() - 1); 
        this.prevDate = formatDate(this.prevDate,'dd-MM-yyyy','en_US');
      }


      else if(currentDate == entrdate){
        this.nextDate = fentdate.setDate(fentdate.getDate() + 1); 
        this.nextDate = formatDate(this.nextDate,'dd-MM-yyyy','en_US');
        this.prevDate = '';        
       }

       else if(currentDate < entrdate){
        this.nextDate = fentdate.setDate(fentdate.getDate() + 1); 
        this.nextDate = formatDate(this.nextDate,'dd-MM-yyyy','en_US');

       this.prevDate = fentdate.setDate(fentdate.getDate() - 2); 
        this.prevDate = formatDate(this.prevDate,'dd-MM-yyyy','en_US');
        
      }
     
  }

}


