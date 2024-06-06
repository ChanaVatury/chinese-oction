import { Present } from "./Present.model";

export class Order
{
    id: number=0;
    userNumber: number=0;
    email:string='';
    total: number=0;
    tickets:Present[]=[];
    
}