export interface SeatsLayout {
  lowerBerth_totalColumns:number,
  lowerBerth_totalRows:number,
  lower_berth:Berth[],
  upperBerth_totalColumns:number,
  upperBerth_totalRows:number,
  upper_berth:Berth[],
  visibility : boolean;
}

export interface Berth { 
  id:number, 
  berthType: number,
  bus_seat_layout_id: number,
  bus_seats: BusSeats,
  colNumber: number,
  rowNumber: number,
  seatText: any,
  Gender:any,
  seat_class_id:number  
  }

  export interface BusSeats{    
    id: number,
    bus_id:number,    
    ticket_price_id:number,
    seats_id: number,
    category: any,
    duration: any,
    new_fare: any,
    ticket_price:TicketPrice
  }

  export interface TicketPrice{
    "base_seat_fare": any,
    "base_sleeper_fare": any,
  }

  