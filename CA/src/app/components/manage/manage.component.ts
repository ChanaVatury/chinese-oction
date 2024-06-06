import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Order } from 'src/app/models/Order.model';
import { Present } from 'src/app/models/Present.model';
import { User } from 'src/app/models/User.model';
import { DonarsService } from 'src/app/services/donars.service';
import { OrderService } from 'src/app/services/order.service';
import { PresentService } from 'src/app/services/present.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  activatedRoute: any;

  userName: any;

  PresentService: any;

  today: Date = new Date();

  winner!: User ;

  winners:string[]=[];

  random:number[]=[];

  presents!:Present[];

  orders:Order[]=[];  

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  selected:number[]=[];

  p!:Present;

  constructor(public userService: UsersService,public orderService:OrderService,public presentService :PresentService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.presentService.reloadPresents$.subscribe(x => {
      this.presentService.getPresents().subscribe(data => this.presents = data);
    });
    this.orderService.reloadOrders$.subscribe(x => {
    this.orderService.getOrders().subscribe(data => this.orders = data);
    });
  }
  
  raffle(present: Present) {
    for (let i = 0; i < this.orders.length; i++) {
      for (let j = 0; j < this.orders[i].tickets.length; j++) {
        if (this.orders[i].tickets[j].number == present.number) {
          for(let h=0;h<this.orders[i].tickets[j].quantity;h++)
          this.selected.push(this.orders[i].userNumber);
        }
      }
    }
    let m = Math.floor(Math.random() * this.selected.length);
    let win = this.selected[m];
    if (this.selected.length != 0) {
      this.userService.getUserById(win).subscribe(data => {
      this.winner = data;
      this.winners.push(present.name);
      this.winners.push(this.winner.userName);
      present.winner=this.winner.userName;
      this.presentService.savePresent(present).subscribe(b => { 
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'present Updated', life: 3000 });
      });
      alert(this.winner.userName);
      sessionStorage.setItem("winners", JSON.stringify(this.winners));
      console.log(this.orders)
      this.selected = [];
      });
    } 
    else {
      alert("no tickets sold");
    }

  }
}
