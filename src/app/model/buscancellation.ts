
export interface Buscancellation {
     buses: any[];
     id: any;
     bus_operator_id: any;
     operatorId: any;
     bus_id: any;    
     month:any;
     year:any; 
     name:any; 
     entry_date:any;   
     cancelled_by: 'Admin';
     reason: any;
     status: 1; 
     busLists: any;
     bus_cancelled_date:BusCancellationDate
}
export interface BusCancellationDate{
     id:any;
     bus_cancelled_id:any;
     cancelled_date:any;
     created_by:any;
}
