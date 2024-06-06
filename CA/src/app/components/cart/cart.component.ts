import { Component, OnInit } from '@angular/core';
import { Present } from 'src/app/models/Present.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute){}

  prod:Present[]=[];

  total:number=0;

  ngOnInit(): void {
   this.prod=JSON.parse(sessionStorage.getItem("MyCart")??"empty");
   for(let i=0;i<this.prod.length;i++){  
   this.total+=this.prod[i].quantity*this.prod[i].ticketPrice;
  }}
delete(present:Present){
for(let i=0;i<this.prod.length;i++){
  if(present.number==this.prod[i].number){
    this.prod.splice(i,1);
    break;
  }
}
sessionStorage.setItem("MyCart",JSON.stringify(this.prod));

}
  payNow(){
  sessionStorage.removeItem("Cart");
  this.router.navigate(['./payment/' + this.total, {relativeTo: this.activatedRoute}]);
  }
  
}
