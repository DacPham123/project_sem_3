import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  username:string;
  account:Account;


  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
  
   this.accountService.findByUsername(this.username).then(
    trueresult =>{         
      this.account= trueresult as Account;

    },
    erros=>{
      console.log(erros);
    }        
  );    
}
}
 