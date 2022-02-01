import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(module => module.NotificationModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./wallet/wallet.module').then(module => module.WalletModule)
      },
      {
        path: 'alltransactionreport',
        loadChildren: () => import('./agentwalletreport/agentwalletreport.module').then(module => module.AgentWalletReportModule)
      },
      {
        path: 'cancellationreport',
        loadChildren: () => import('./agentticketcancellationreport/agentticketcancellationreport.module').then(module => module.AgentTicketCancellationReportModule)
      }, 
      {
        path: 'completereport',
        loadChildren: () => import('./agentcompletereport/agentcompletereport.module').then(module => module.AgentCompleteReportModule)
      },
      {
        path: 'commissionreport',
        loadChildren: () => import('./agentcomissionreport/agentcomissionreport.module').then(module => module.AgentComissionReportModule)
      },
      {
        path: 'commissionslab',
        loadChildren: () => import('./commissionslab/commissionslab.module').then(module => module.CommissionslabReportModule)
      },
      {
        path: 'customercommissionslab',
        loadChildren: () => import('./customercommissionslab/customercommissionslab.module').then(module => module.CustomerCommissionslabReportModule)
      },
      {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(module => module.BookingModule)
      },

      {
        path: 'listing',
        loadChildren: () => import('./search/search.module').then(module => module.SearchModule)
      },

      {
        path: 'bookTicket',
        loadChildren: () => import('./book-ticket/book-ticket.module').then(module => module.BookTicketModule)
      },

      {
        path: 'cancelTicket',
        loadChildren: () => import('./cancel-ticket/cancel-ticket.module').then(module => module.CancelTicketModule)
      },
      {
        path: 'agentprofile',
        loadChildren: () => import('./agentprofile/agentprofile.module').then(module => module.AgentprofileModule)
      },

     
     
    
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
