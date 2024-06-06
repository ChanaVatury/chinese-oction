import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today: Date = new Date();
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  ngOnInit(): void {

    setInterval(() => {
      this.today = new Date()
    }, 1000);
  }

}
