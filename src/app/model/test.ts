// export interface Test {
//     berthType:bType []; 
// }
export interface Test
{
    BookType:bType[]
}
export interface bType
{
    seatText:any;
    seatType:any;
    rowNumber:any;
    colNumber:any;
}
export interface seatBlock extends Array<bType>{}