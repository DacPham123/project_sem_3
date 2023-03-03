import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'agent-home',
  templateUrl: './agent-home.component.html',
})
export class AgentHomeComponent implements OnInit {

  agents: Account[];
  responsiveOptions;

  constructor(
    private accountService: AccountService
  ) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.accountService.showAgent().then(
      res => {
          this.agents = res as Account[]
      },
      err =>{
          console.log(err);
      });
  }

}
