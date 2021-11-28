import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  timeout:any='4000';
  position = 'toast-bottom-right';
  title: string;
  msg: string;
  showCloseOption = true;
  themeOptions = 'bootstrap';
  timeoutOption = 5000;
  closeOther = true;


  //constructor(private toastyService: ToastyService) { }
  constructor(private toastr: ToastrService) { }


  addToast(options) {

    let config = {
      positionClass: this.position,
      closeButton: this.showCloseOption,
      timeOut: this.timeoutOption
    }
    
    // console.log(options);
    // if (this.closeOther) {
    // //  this.toastyService.clearAll();
    // }    
    // this.position = options.position ? options.position : this.position;
    // const toastOptions: ToastOptions = {
    //   title: options.title,
    //   msg: options.msg,
    //   showClose: this.showCloseOption,
    //   timeout: this.timeoutOption,
    //   theme: this.themeOptions,
    //   onAdd: (toast: ToastData) => {
    //     /* added */
    //   },
    //   onRemove: (toast: ToastData) => {
    //     /* removed */
    //   }
    // };

    switch (options.type) {
      case 'default': this.toastr.info(options.msg, options.title, config); break;
      case 'info': this.toastr.info(options.msg, options.title, config); break;
      case 'success': this.toastr.success(options.msg, options.title, config); break;
      case 'wait': this.toastr.warning(options.msg, options.title, config); break;
      case 'error':  this.toastr.error(options.msg, options.title, config); break;
      case 'warning':  this.toastr.warning(options.msg, options.title, config); break;
      case 'default':
        this.toastr.error(options.msg, options.title, config); break;
    }
   
  }
  notify(message:any,type:any){

    if(type=='Error'){

      this.toastr.error(message, type, {
        timeOut: this.timeout,
        positionClass: 'toast-bottom-right'
      });

    }

    if(type=='Success'){

      this.toastr.success(message, type, {
        timeOut: this.timeout,
        positionClass: 'toast-bottom-right'
      });

    }

   

  }
}

