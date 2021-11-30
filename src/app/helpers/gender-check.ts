import { FormGroup } from '@angular/forms';

export function GenderCheck(controlName: string,SeatcontrolName: string,  genderRestrictSeats: any) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const Seatcontrol = formGroup.controls[SeatcontrolName];


        if (control.errors && !control.errors.GenderError) {
            return;
        }


           genderRestrictSeats.filter(itm => { 
                if(Seatcontrol.value!=null && Seatcontrol.value ==itm.seat_name && control.value==itm.canSelect){
                    control.setErrors(null);
                } 

                if(Seatcontrol.value!=null && Seatcontrol.value ==itm.seat_name && control.value!=itm.canSelect){

                    let g= control.value;

                    if(g=='F'){
                        g= 'Female';
                    }

                    else if(g=='M'){
                        g= 'Male';
                    }

                    else if(g=='O'){
                        g= 'Other';
                    }

                    else if(itm.canSelect =='none'){
                        g = 'No one';
                    }
                    
                    control.setErrors({ GenderError: true , message: g+' is not allowed' });                    
                }
        
            }); 
        
    }
}