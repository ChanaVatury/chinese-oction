import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raffle-results',
  templateUrl: './raffle-results.component.html',
  styleUrls: ['./raffle-results.component.css']
})
export class RaffleResultsComponent implements OnInit {
winners:string[]=[];
responsiveOptions: any[] | undefined;
  ngOnInit(){
    var a= JSON.parse(sessionStorage.getItem("winners")??"null")
    if(a!="null")
    this.winners=a;
    
   console.log(this.winners)
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
}

 


    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }

}