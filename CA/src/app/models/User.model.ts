import { Present } from "./Present.model";

export class User
{
    number:number=0;
    userName: string='';
    password:string='';
    firstName: string='';
    lastName: string='';
    theTickets:Present[]=[];
}