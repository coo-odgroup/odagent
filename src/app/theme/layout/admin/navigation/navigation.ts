import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const AgentItems = [
  {
    id: 'odbus',
    title: '',
    type: 'group',
    icon: 'feather icon-home',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'item',
        icon: 'feather icon-home',
        url: 'dashboard/landing'
      },
      {
        id: 'booking',
        title: 'Book Ticket',
        type: 'item',       
        icon: 'feather icon-gitlab',
        url: 'agent/booking'
      },
      {
        id: 'agentprofile',
        title: 'Agent Profile',
        type: 'item',       
        icon: 'feather icon-gitlab',
        url: 'agent/agentprofile'
      },
      {
        id: 'cancelticket',
        title: 'Cancel Ticket',
        type: 'item',       
        icon: 'feather icon-gitlab',
        url: 'agent/cancelTicket'
      },
      {
        id: 'notification',
        title: 'Notification',
        type: 'item',       
        icon: 'feather icon-message-circle',
        url: 'agent/notification'
      },
      {
        id: 'wallet',
        title: 'Wallet',
        type: 'item',
        icon: 'feather icon-shield',
        url: 'agent/wallet'
      },     
      {
        id: 'commissionslab',
        title: 'Commission Slab',
        type: 'item',
        icon: 'feather icon-upload-cloud',
        url: 'agent/commissionslab'
      },
      {
        id: 'customercommissionslab',
        title: 'Customer Commission Slab',
        type: 'item',
        icon: 'feather icon-wind',
        url: 'agent/customercommissionslab'
      },
      // {
      //   id: 'forget-password',
      //   title: 'Forget Password',
      //   type: 'item',
      //   icon: 'feather icon-wind',
      //   url: 'agent/forget-password'
      // }

    ]
  },
  {
    id: 'report',
    title: 'Reports',
    type: 'collapse',
    icon: 'feather icon-thermometer',
    children: [
      {
        id: 'walletreport',
        title: 'All Transaction Report',
        type: 'item',
        icon: 'ng-tns-c12-3 feather icon-file-text',
        url: 'agent/alltransactionreport'
      },
      {
        id: 'cancellationreport',
        title: 'Cancellation Report',
        type: 'item',
        icon: 'feather icon-pie-chart',
        url: 'agent/cancellationreport'
      },
      {
        id: 'completereport',
        title: 'Complete Report',
        type: 'item',
        icon: 'feather icon-pie-chart',
        url: 'agent/completereport'
      },
      {
        id: 'commissionreport',
        title: 'Commission Report',
        type: 'item',
        icon: 'feather icon-pie-chart',
        url: 'agent/commissionreport'
      },
     
     
      // {
      //   id: 'user',
      //   title: 'Operators',
      //   type: 'item',
      //   icon:'feather icon-users',
      //   url: 'setting/user'
      // },          
      // {
      //   id: 'association',
      //   title: 'Association',
      //   type: 'item',
      //   icon:'feather icon-user-plus',
      //   url: 'setting/association'
      // },
      
    ]
  },
];

// const NavigationItems = [
//   {
//     id: 'odbus',
//     title: '',
//     //translate: 'NAV.ODBUS',
//     type: 'group',
//     icon: 'feather icon-home',
//     children: [
//       {
//         id: 'dashboards',
//         title: 'Dashboards',
//         //translate: 'NAV.DASHBOARDS',
//         type: 'item',
//         icon: 'feather icon-home',
//         url: 'dashboard/landing'
//       },
//       {
//         id: 'busmanagement',
//         title: 'Bus Management',
//         //translate: 'NAV.BUSMANAGEMENT',
//         type: 'collapse',
//         icon: 'feather icon-tv',
//         children: [
//           {
//             id: 'managelocation',
//             title: 'Location',
//             type: 'item',
//             icon: 'feather icon-map-pin',
//             url: 'busmanagement/managelocation'
//           },
//           {
//             id: 'BoardingDropping',
//             title: 'Boarding/Dropping',
//             type: 'item',
//             icon:'feather icon-minimize-2',
//             url: 'busmanagement/BoardingDropping'
//           },
//           {
//             id: 'manageus',
//             title: 'Bus',
//             type: 'item',
//             icon:'feather icon-gitlab',
//             url: 'busmanagement/managebus'
//           },
//           {
//             id: 'coupon',
//             title: 'Coupon',
//             type: 'item',
//             icon:'feather icon-tag',
//             url: 'busmanagement/coupon'
//           },
//           {
//             id: 'gallery',
//             title: 'Gallery',
//             type: 'item',
//             icon:'feather icon-image',
//             url: 'busmanagement/busgallery'
//           },
//           {
//             id: 'seatfare',
//             title: 'Seat Fare',
//             type: 'item',
//             icon:'feather icon-hash',
//             url: 'busmanagement/seatfare'
//           },


//           {
//             id: 'bustype',
//             title: 'Bus Type',
//             type: 'item',
//             icon:'feather icon-share-2',
//             url: 'busmanagement/bustype'
//           },
//           {
//             id: 'safety',
//             title: 'Safety',
//             type: 'item',
//             icon:'feather icon-sunrise',
//             url: 'busmanagement/safety'
//           },
//           {
//             id: 'seatingtype',
//             title: 'Seating Type',
//             type: 'item',
//             icon:'feather icon-cloud',
//             url: 'busmanagement/seatingtype'
//           },
//           {
//             id: 'Amenities',
//             title: 'Amenities',
//             type: 'item',
//             icon:'feather icon-heart-on',
//             url: 'busmanagement/amenities'
//           },

//           {
//             id: 'SeatLayout ',
//             title: 'Seat Layout',
//             type: 'item',
//             icon:'feather icon-server',
//             url: 'busmanagement/SeatLayout'
//           },
//           {
//             id: 'CancellationSlab',
//             title: 'Cancellation Slab',
//             type: 'item',
//             icon:'feather icon-sidebar',
//             url: 'busmanagement/cancellationslab'
//           },
//           {
//             id: 'BusOperator',
//             title: 'Bus Operator',
//             type: 'item',
//             icon:'feather icon-sun',
//             url: 'busmanagement/busoperator'
//           },
//           {
//             id: 'BusSchedule',
//             title: 'Bus Schedule',
//             type: 'item',
//             icon:'feather icon-twitter',
//             url: 'busmanagement/busschedule'
//           },
//           // {
//           //   id: 'Settings',
//           //   title: 'Fare Setting',
//           //   type: 'item',
//           //   url: 'busmanagement/settings'
//           // },
//           {
//             id: 'Offers',
//             title: 'Offers',
//             type: 'item',
//             icon:'feather icon-watch',
//             url: 'busmanagement/offers'
//           },
//           {
//             id: 'BusSequence',
//             title: 'Bus Sequence',
//             type: 'item',
//             icon:'feather icon-sliders',
//             url: 'busmanagement/BusSequence'
//           }
//             // ,
//             // {
//             //   id   : 'formValidation',
//             //   title: 'Demo Items',
//             //   type : 'item',
//             //   url  : 'busmanagement/formValidation'
//             // }

//         ]
//       },
//       {
//         id: 'bookingmanagement',
//         title: 'Booking Management',
//         //translate: 'NAV.BOOKINGMANAGEMENT',
//         type: 'collapse',
//         icon: 'feather icon-gitlab',
//         children: [
//           {
//             id: 'BusCancellation',
//             title: 'Bus Cancellation',
//             type: 'item',
//             icon:'feather icon-wifi-off',
//             url: 'bookingmanagement/buscancellation'
//           },

//           {
//             id: 'seatBlock',
//             title: 'Seat Block',
//             type: 'item',
//             icon:'feather icon-slash',
//             url: 'bookingmanagement/seatblock'
//           },
//           {
//             id: 'seatopen',
//             title: 'Seat Open',
//             type: 'item',
//             icon:'feather icon-shield',
//             url: 'bookingmanagement/seatopen'
//           },
//           {
//             id: 'bookingseized',
//             title: 'Booking Seized',
//             type: 'item',
//             icon:'feather icon-command',
//             url: 'bookingmanagement/bookingseized'
//           },
//           {
//             id: 'specialfare',
//             title: 'Special Fare',
//             type: 'item',
//             icon:'feather icon-umbrella',
//             url: 'bookingmanagement/specialfare'
//           },
//           {
//             id: 'ownerfare',
//             title: 'Owner Fare',
//             type: 'item',
//             icon:'feather icon-trending-up',
//             url: 'bookingmanagement/ownerfare'
//           },
//           {
//             id: 'festivalfare',
//             title: 'Festival Fare',
//             type: 'item',
//             icon:'feather icon-trending-up',
//             url: 'bookingmanagement/festivalfare'
//           },
//           {
//             id: 'ownerpayment',
//             title: 'Owner Payment',
//             type: 'item',
//             icon:'feather icon-user-check',
//             url: 'bookingmanagement/ownerpayment'
//           },
//           //   {
//           //       id   : 'CancellationSlab',
//           //       title: 'Cancellation Slab',
//           //       type : 'item',
//           //       url  : 'busmanagement/CancellationSlab'
//           //   }
//         ]
//       },
//       {
//         id: 'reports',
//         title: 'Reports',
//         // translate: 'NAV.REPORTS',
//         type: 'collapse',
//         icon: 'feather icon-file-text',
//         children: [
//           {
//             id: 'agentwalletrequest',
//             title: 'Agent Wallet Request',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/agentwalletrequest'
//           },
//           {
//             id: 'pushnotification',
//             title: 'Push Notification',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/pushnotification'
//           },
//           {
//             id: 'seatopenreport',
//             title: 'Seat Open Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/seatopenReport'
//           },
//           {
//             id: 'extraseatopenreport',
//             title: 'Extra Seat Open Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/extraseatopenReport'
//           },
//           {
//             id: 'completereport',
//             title: 'Complete Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/completeReport'
//           },
//           {
//             id: 'seatblockreport',
//             title: 'Seat Block Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/seatblockReport'
//           },
//           {
//             id: 'cancleticketsReport',
//             title: 'Cancel Tickets Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/cancleticketsReport'
//           },
//           {
//             id: 'failedtransactionreport',
//             title: 'Failed Transaction Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/failedtransactionreport'
//           },
//           {
//             id: 'buscancellationreport',
//             title: 'Bus Cancellation Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/buscancellationreport'
//           },
//           {
//             id: 'ownerpaymentreport',
//             title: 'Owner Payment Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/ownerpaymentreport'
//           },
//           // {
//           //   id   : 'cleartransactionreport',
//           //   title: 'Clear Transaction Tickets Report',
//           //   type : 'item',
//           //   url  : 'reports/cleartransactionreport'
//           // },
//           {
//             id: 'contactreport',
//             title: 'Contact Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/contactreport'
//           },
//           {
//             id: 'couponuseduserreport',
//             title: 'Coupon Used User Report',
//             type: 'item',
//             icon:'feather icon-pie-chart',
//             url: 'reports/couponuseduserreport'
//           },
//           // {
//           //     id   : 'seat',
//           //     title: 'Seat',
//           //     type : 'item',
//           //     url  : 'reports/seat'
//           // },
//           // {
//           //     id   : 'specialfare',
//           //     title: 'SpecialFare',
//           //     type : 'item',
//           //     url  : 'reports/specialfare'
//           // },
//           // {
//           //     id   : 'Bus',
//           //     title: 'Bus',
//           //     type : 'item',
//           //     url  : 'reports/bus'
//           // },
//           // {
//           //     id   : 'trasaction',
//           //     title: 'Trasaction',
//           //     type : 'item',
//           //     url  : 'reports/trasaction'
//           // },
//           // {
//           //     id   : 'owener ',
//           //     title: 'Owner',
//           //     type : 'item',
//           //     url  : 'reports/Owner'
//           // }

//         ]
//       },
//       {
//         id: 'setting',
//         title: 'Website CMS Setting',
//         type: 'collapse',
//         icon: 'feather icon-layers',
//         children: [
//           {
//             id: 'pagecontent',
//             title: 'Page Content',
//             type: 'item',
//             icon:'feather icon-github',
//             url: 'setting/pagecontent'
//           }, 
//           {
//             id: 'socialmedia',
//             title: 'Social Media',
//             type: 'item',
//             icon:'feather icon-award',
//             url: 'setting/socialmedia'
//           },
//           {
//             id: 'userreview',
//             title: 'User Review',
//             type: 'item',
//             icon:'feather icon-message-circle',
//             url: 'setting/userreview'
//           },
//           {
//             id: 'testimonial',
//             title: 'Testimonial',
//             type: 'item',
//             icon:'feather icon-mail',
//             url: 'setting/testimonial'
//           },
//           {
//             id: 'bannermanagement',
//             title: 'Banner Management',
//             type: 'item',
//             icon:'feather icon-package',
//             url: 'setting/bannermanagement'
//           },
//           {
//             id: 'seosetting',
//             title: 'SEO Setting',
//             type: 'item',
//             icon:'feather icon-link',
//             url: 'setting/seosetting'
//           },
//           {
//             id: 'specialslider',
//             title: 'Special Slider',
//             type: 'item',
//             icon:'feather icon-speaker',
//             url: 'setting/specialslider'
//           },
//           {
//             id: 'mastersetting',
//             title: 'Master Setting',
//             type: 'item',
//             icon:'icon feather icon-target',
//             url: 'setting/mastersetting'
//           }
//         ]
//       },
//       {
//         id: 'associates',
//         title: 'Associates',
//         type: 'collapse',
//         icon: 'feather icon-thermometer',
//         children: [

//           {
//             id: 'user',
//             title: 'Operators',
//             type: 'item',
//             icon:'feather icon-users',
//             url: 'setting/user'
//           }, 
//           {
//             id: 'agent',
//             title: 'Agent',
//             type: 'item',
//             icon:'feather icon-user-plus',
//             url: 'setting/agent'
//           },
//           {
//             id: 'agentcomission',
//             title: 'Agent Comission Slab',
//             type: 'item',
//             icon:'feather icon-upload-cloud',
//             url: 'setting/agentcomission'
//           },
//           {
//             id: 'agentfee',
//             title: 'Agent Fee Slab',
//             type: 'item',
//             icon:'feather icon-wind',
//             url: 'setting/agentfee'
//           },
//         ]
//       },

//     ]
//   }
// ];

@Injectable()
export class NavigationItem {
  public get() {
    var ROLE_ID = localStorage.getItem("ROLE_ID");
    if (ROLE_ID == "3") {
      return AgentItems;
    }
  }
}
