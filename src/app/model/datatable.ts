export interface DataTablesResponse
{
  status:string;
  message:string;
  data:DataResponse;
}
export interface DataResponse {  
  draw: number;
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  aaData: any[];   
}