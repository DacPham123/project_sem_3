import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'headeradmin',
  templateUrl: './headeradmin.component.html',
})
export class HeaderAdminComponent implements OnInit {


  username:string;
  account:Account;

  constructor(private accountService: AccountService,) {

  }

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
 