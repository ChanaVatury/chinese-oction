import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private userService :UsersService,private messageService:MessageService){}
 
  userName:string='';

  password:string='';

  user:User=new User;

  login(){
    this.user.userName=this.userName;
    this.user.password=this.password;
    this.userService.login(this.user).subscribe(a => { 
      if(a==null){
        this.router.navigate(['./register/', {relativeTo: this.activatedRoute}]);
      }
    if(a.userName=="chana"&&a.password=="manager"){
      this.router.navigateByUrl('manage');
    }
      sessionStorage.setItem("user",JSON.stringify(a));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'login successful', life: 3000 });
    });
    this.user = new User;
        this.router.navigate(['./raffle/' + this.userName, {relativeTo: this.activatedRoute}]);
      }
      register(){
        this.router.navigate(['./register/', {relativeTo: this.activatedRoute}]);
      }
}
