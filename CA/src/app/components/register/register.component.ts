import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private userService :UsersService,private messageService:MessageService){}

  userName:string='';

  firstName:string='';

  lastName:string='';

  password:string='';

  user = new User;

  register(){
    this.user.userName=this.userName;
    this.user.firstName=this.firstName;
    this.user.lastName=this.lastName;
    this.user.password=this.password;
            this.userService.addUser(this.user).subscribe(a => {  
              this.userService.setReloadUser();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
            });
          this.user = new User;
      this.router.navigate(['./main/', {relativeTo: this.activatedRoute}]);
  }
}
