import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { Result } from 'src/app/models/result.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { AccountService } from 'src/app/services/account.service';

import { NewsService } from 'src/app/services/news.service';
import { Check } from 'src/app/services/validation.service';

@Component({
  // selector:'contain-dashboard',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, AfterContentChecked {
  @ViewChild(TableModule) dt: TableModule;

  errorUsername: string;
  errorPass: string;
  errorRePass: string;
  errorPhone: string;
  errorEmail: string;
  errorResetPass: string;
  errorVerify: string;
  customers: Account[];
  selectedCustomers: Account[];
  statuses: any[];
  accounts: Account[];
  dialogTitle2: string
  displayModal2: boolean;
  displayModal3: boolean;
  displayModal4: boolean;

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  items: any;
  customerDialog: boolean;
  addAccountForm: FormGroup;
  role: number;
  roleString: string;
  selectedStatus: any;
  status: any;
  accuser: string;
  adminStatus: number;
  constructor(
    private accSer: AccountService,
    private formBuilder: FormBuilder,
    private check: Check,
    private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cdref: ChangeDetectorRef
  ) {
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
  ngOnInit(): void {
    this.customerDialog = false;
    this.activateRoute.paramMap.subscribe(param => {
      var str = param.get('action');

      this.role = parseInt(str);
      if (str == null || str == "") {
        this.role = 2;
      }
      if (this.role == 1) {
        this.role = 2;
      }
      this.accSer.findByRole(this.role).then(
        res => {
          this.customers = res as Account[];

        },
        err => {
          console.log(err)
        }
      )
      switch (this.role) {
        case 2:
          this.roleString = "Admin";

          break;
        case 3:
          this.roleString = "Agent";

          break;
        case 4:
          this.roleString = "Private Seller";

          break;
        case 5:
          this.roleString = "Visitor";

          break;
      };
    });
    this.adminStatus = parseInt(localStorage.getItem("agentStatus"));

    this.addAccountForm = this.formBuilder.group({
      username: '',
      passwords: '',
      accrole: this.role,
      fullname: '',
      addresss: '',
      phone: '',
      photo: 'noavatar.jpg',
      email: '',
      accstatus: 1

    });
    this.accSer.findAll().then(res => { this.accounts = res as Account[] }, err => { console.log(err) })
    this.accSer.findByRole(this.role).then(
      res => {
        this.customers = res as Account[];

      },
      err => {
        console.log(err)
      }
    )



  }
  openNew() {
    this.customerDialog = true;
    this.errorUsername = "";
    this.errorEmail = "";
    this.errorPhone = "";
    this.addAccountForm = this.formBuilder.group({
      username: '',
      passwords: '',
      accrole: this.role,
      fullname: '',
      addresss: '',
      phone: '',
      photo: 'noavatar.jpg',
      email: '',
      accstatus: 1

    });

  }
  save() {
    var account: Account = this.addAccountForm.value;
    account.username = account.username.trim();
    account.phone = account.phone.trim();
    account.email = account.email.trim();
    this.errorUsername = this.check.checkUser(account.username, this.accounts);
    this.errorEmail = this.check.checkEmail(account.email, this.accounts);
    this.errorPhone = this.check.checkString(account.phone, "Phone");



    if (this.errorUsername === "" && this.errorEmail === "" && this.errorPhone === "") {
      this.displayModal3 = true;
      this.accSer.createBySuperAdmin(account).then(
        res => {

          var re: Result = res as Result;
          this.displayModal2 = true;
          if (re) {

            this.dialogTitle2 = "Success! Info account sent to account's email ";
            this.addAccountForm = this.formBuilder.group({
              username: '',
              passwords: '',
              accrole: this.role,
              fullname: '',
              addresss: '',
              phone: '',
              photo: 'noavatar.jpg',
              email: '',
              accstatus: 1


            });
            this.accSer.findAll().then(res => { this.accounts = res as Account[] }, err => { console.log(err) })
            this.accSer.findByRole(this.role).then(
              res => {
                this.customers = res as Account[];

              },
              err => {
                console.log(err)
              }
            )
            this.displayModal3 = false;
            this.customerDialog = false;


          } else {
            this.dialogTitle2 = "Failed";


          }
        }
        , err => {
          this.displayModal2 = true;
          this.dialogTitle2 = "Failed";
          console.log(err);

        }
      )
    }



  }

  getStatus(stt: number, user: string) {
    this.displayModal4 = true;
    this.accuser = user;
  }
  setStatus() {
    alert(this.selectedStatus.value);

  }
  confirm1(user: string, status: number) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to lock this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accSer.updateStatusBySuperAdmin(user, status).then(
          res => {
            var stt = res as number;

            switch (stt) {
              case 1:
                this.displayModal3 = true;
                this.accSer.sendemaillocked(user).then(
                  res => { this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have locked this account' }); this.displayModal3 = false; },
                  err => { console.log(err); this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have locked this account' }); this.displayModal3 = false; }
                )
                break;
              case 0:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
                break;
              case 2:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This account has been locked' });
                break;
              case 3:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "This admin's account has been locked" });
                break;
              case 4:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "This account is locked by admin" });
                break;

            }
            this.accSer.findByRole(this.role).then(
              res => {
                this.customers = res as Account[];

              },
              err => {
                console.log(err)
              }
            )
          },
          err => {
            console.log(err);
          }

        )

      }
    });
  }
  confirm2(user: string, status: number) {
   
    this.confirmationService.confirm({
      message: 'Are you sure that you want to set status active this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accSer.updateStatusBySuperAdmin(user, status).then(
          res => {
            var stt = res as number;

            switch (stt) {
              case 1:
                this.displayModal3 = true;
                this.accSer.sendemail(user).then(
                  res => { this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have actived this account' }); this.displayModal3 = false;},
                  err => { console.log(err); this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have actived this account' }); this.displayModal3 = false;}
                )
                break;
              case 0:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
                break;
              case 2:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This account has been actived' });
                break;
              case 3:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "This admin's account has been locked" });
                break;
              case 4:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "This account is locked by admin" });
                break;
            }
            this.accSer.findByRole(this.role).then(
              res => {
                this.customers = res as Account[];

              },
              err => {
                console.log(err)
              }
            )
          },
          err => {
            console.log(err);
          }
        )
        
      }
    });
  }
}





