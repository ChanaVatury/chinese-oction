import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Order } from 'src/app/models/Order.model';
import { Present } from 'src/app/models/Present.model';
import { User } from 'src/app/models/User.model';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public orderService:OrderService,public userServcie: UsersService,private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router, private activatedRoute: ActivatedRoute){}
  
  total:number=0;

  order:Order=new Order;

  userName:string='';

  tickets:Present[]=[]

  user:User=new User;

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(d => this.total = d['total'])
    this.tickets=JSON.parse(sessionStorage.getItem("MyCart")??"none");
    this.user=JSON.parse(sessionStorage.getItem("user")??"none");
  }
  
  createOrder(){
    this.order.userNumber=this.user.number;
    this.order.email=this.user.userName;
    this.order.total=this.total;
    this.order.tickets=this.tickets;
    this.orderService.createOrder(this.order).subscribe(a => {
      this.orderService.setReloadOrder();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
      alert("thanks for your order #"+a.id+"🎉");
      sessionStorage.removeItem("MyCart");
    });
    this.router.navigateByUrl('raffle/'+this.userName);
    this.order=new Order;
  }
  
  }

 


