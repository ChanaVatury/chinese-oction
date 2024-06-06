import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router, private activatedRoute: ActivatedRoute,private userService:UsersService){}
  userName:string=''
  password:string=''
  user:User=new User;
  login(){

this.user.userName=this.userName
this.user.password=this.password
this.userService.login(this.user).subscribe(a => {
  if(a==null){
    this.router.navigateByUrl('register')
    return;
  }
  if(this.userName=="chana"&& this.password=="chana"){
    this.router.navigate(['./manage/' ,{relativeTo:this.activatedRoute}])
  }
      
  sessionStorage.setItem("user",JSON.stringify(a))
  console.log(a)
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'login Created', life: 3000 });
  });

    this.router.navigate(['./raffle/' + this.userName,{relativeTo:this.activatedRoute}])
  }
  register(){
    this.router.navigate(['./register/' ,{relativeTo:this.activatedRoute}])
  }



}
