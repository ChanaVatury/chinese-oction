import { Component, OnInit } from '@angular/core';
import { Present } from 'src/app/models/Present.model';
import { PresentService } from 'src/app/services/present.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.css']
})
export class RaffleComponent implements OnInit {

presents!: Present[];

userName:string='';

winners:string[]=[];

winner:string='';

present:Present=new Present;

userTickets:Present[]=[];

constructor(private PresentService: PresentService,private router: Router, private activatedRoute: ActivatedRoute) {}

ngOnInit() :void{
      this.activatedRoute.params.subscribe(d => this.userName = d['userName']);
      this.PresentService.reloadPresents$.subscribe(x => {
        this.PresentService.getPresents().subscribe(data => this.presents = data);
        if(sessionStorage.getItem("Cart")){
          this.userTickets=JSON.parse(sessionStorage.getItem("Cart")??"null");
        }
     
    });
  }

addToCart(present:Present){
  let i,k=0;
  for(i=0;i<this.userTickets.length;i++){
    if(this.userTickets[i].name==present.name){
       this.userTickets[i].quantity++
       console.log(this.userTickets[i].quantity)
       sessionStorage.setItem("Cart",JSON.stringify(this.userTickets))
       k=1;
       break;
    }
  }
  if(k!=1)
    this.userTickets.push(present)
    sessionStorage.setItem("Cart",JSON.stringify(this.userTickets))
}

pay(){
  sessionStorage.setItem("MyCart",JSON.stringify(this.userTickets))
  this.router.navigateByUrl('cart');
}


}
