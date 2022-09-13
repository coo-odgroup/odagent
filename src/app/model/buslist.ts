
export interface Buslist {
    origin : any,
    CompanyID : any,
    ReferenceNumber : any,
    BoardingPoints : any,
    DroppingPoints : any,
    RouteTimeID : any,    
    busId:number,
    busName:string,
    popularity:any,
    busNumber:string,
    maxSeatBook:number;
    operatorId:number,
    operatorName:string,
    operatorUrl:string,
    sittingType:string
    busType:string
    busTypeName:string
    totalSeats:number,
    seaters:number,
    sleepers:number,
    startingFromPrice:number,
    departureTime:string,
    arrivalTime:string,
    totalJourneyTime:string,
    safety:any[],
    amenity:any[],
    busPhotos:any[],
    seaterPrice:any,
    sleeperPrice:any
}
