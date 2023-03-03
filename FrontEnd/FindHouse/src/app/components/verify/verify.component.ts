import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Result } from 'src/app/models/result.model';
import { ResultActive } from 'src/app/models/resultActive.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
    templateUrl: 'verify.component.html',
})
export class VerifyComponent implements OnInit {

    verify: string;
    activeCode: string;
    username: string;
    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router,
        private accountSer: AccountService
    ) { }

    ngOnInit(): void {

        this.activateRoute.paramMap.subscribe(param => {
            this.activeCode = param.get('activeCode');
            this.username = param.get('username');

        });
        this.accountSer.activeAccount(this.username, this.activeCode).then(
            res => {
                var resultAc: ResultActive = res as ResultActive;
                switch (resultAc.result) {
                    case 0:
                        alert('Username not exits');
                        break;
                    case 1:
                        alert('This account has been activated');
                        break;
                    case 2:
                        alert('Active success');
                        break;
                    case 3:
                        alert('Active Failed');
                        break;
                   
                }
                this.router.navigate(['/login'])
            },
            err => {
                alert('Active Failed');
            }
        )
        
    }

}
