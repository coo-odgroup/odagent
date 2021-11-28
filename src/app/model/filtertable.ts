export interface Filtertable
{
  length:any;
  search:any;
  status:string;
  message:string;
  data:TableResponse;
}
export interface TableResponse {  
  draw: number;
  iTotalRecord: number;
  aTotalRecord: number;
  aResult: any[];   
}