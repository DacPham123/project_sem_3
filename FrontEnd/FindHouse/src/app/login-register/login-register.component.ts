import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Check } from '../services/validation.service';
import { Account } from '../models/account.model';
import { LoginModel } from '../models/login.model';
import { Result } from '../models/result.model';
import { Role } from '../models/role.model';
import { UserModel } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { LoginService } from '../services/login.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PresenceService } from '../message/presence.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  username: string;
  password: string;
  loginDetail: LoginModel;
  addAccountForm: FormGroup;
  roles: Role[];
  rolew: any;
  error: string;
  errorUsername: string;
  errorPass: string;
  errorRePass: string;
  errorPhone: string;
  errorEmail: string;
  errorResetPass: string;
  errorVerify: string;
  repass: string;
  accounts: Account[];
  displayModal: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  displayModal4: boolean;
  displayModal5: boolean;
  displayModal6: boolean;
  dialogTitle: string;
  dialogTitle2: string;
  dialogTitle3: string;
  usernameResetPass: string;
  verifyCode: string;
  verifyCodeSend: string;
  checkTime: boolean;
  checkInvlalidPassTime: boolean;
  accountCheckStatus: number;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private accountService: AccountService, private router: Router, private check: Check, private jwtHelper: JwtHelperService, private presenceService: PresenceService) {


  }

  ngOnInit(): void {
    if (localStorage.getItem("role") != null || localStorage.getItem("role") === "") {
      if (window.location.toString() == "http://localhost:4200/login") {
        switch (localStorage.getItem("role").trim()) {
          case 'superadmin':

            this.router.navigate(['/superadmin'])
            break;
          case 'admin':

            this.router.navigate(['/admin'])
            break;
          case 'agent':

            this.router.navigate(['/home'])
            break;
          case 'privateseller':

            this.router.navigate(['/privatesale'])
            break;
          case 'visitor':

            this.router.navigate(['/home']);
            break;

        }

      } else {
        window.location.reload();
      }


    }


    this.username = "";
    this.password = "";
    this.error = "";
    this.repass = "";
    this.loginDetail = new LoginModel;
    this.accountService.findAll().then(
      res => {
        this.accounts = res as Account[];

      },
      err => {
        console.log(err);
      }

    );


    this.addAccountForm = this.formBuilder.group({
      username: '',
      passwords: '',
      accrole: "5",
      fullname: '',
      addresss: '',
      phone: '',
      photo: 'noavatar.jpg',
      email: '',
      accstatus: 0

    });



  }
  login() {

    this.displayModal3 = true;
    this.loginDetail.username = this.username;
    this.loginDetail.password = this.password;

    this.loginService.checkLogin(this.loginDetail).then(
      res => {
        this.accountService.findByUsername(this.username).then(res => { var accountCheck = res as Account; if (accountCheck != null) { this.accountCheckStatus = accountCheck.accstatus } });
        var token = res as string;
        if (token == "Invaid creadentials") {



          if (this.accountCheckStatus == 2) {
            this.dialogTitle = "Account is locked due to incorrect login many times";
          } else {
            this.dialogTitle = "Wrong username or password";
            if (localStorage.getItem(this.username) === "" || localStorage.getItem(this.username) == null) {
              localStorage.setItem(this.username, "3");
              this.checkInvlalidPassTime = true;
              setTimeout(() => {
                this.checkInvlalidPassTime = false;
                localStorage.removeItem(this.username);
              }, 300000);
            } else {
              localStorage.setItem(this.username, (parseInt(localStorage.getItem(this.username)) - 1).toString())
            }
            if (this.checkInvlalidPassTime && parseInt(localStorage.getItem(this.username)) == 0) {
              this.loginService.updateLimitLogin(this.username.trim().toLowerCase(), 2);
              localStorage.removeItem(this.username)
            }
          }

        } else {
          localStorage.setItem("jwt", token);
          var decodedToken = this.jwtHelper.decodeToken(token);

          // var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
          // var isExpired = this.jwtHelper.isTokenExpired(token);
          var status = decodedToken.Status;

          /// start signalR WebSocket connection for sending message
          this.presenceService.createHubConnection(token);
          if (status == 0) {
            this.dialogTitle = "Account not activated";
          } else if (status == 2) {
            this.dialogTitle = "Account is locked due to incorrect login many times";
          } else if (parseInt(decodedToken.StatusAdmin) == 4) {
            this.dialogTitle = "Your admin account has been locked";
          } else if (status == 3) {
            this.dialogTitle = "The account is locked because the admin has locked the account";
          } else if (status == 4) {
            this.dialogTitle = "The account is locked because the super admin has locked the account";
          } else {

            localStorage.setItem("username", decodedToken.Username.trim());
            localStorage.setItem("role", decodedToken.Role.trim());
            localStorage.setItem("status", status.trim());
            localStorage.setItem("agentStatus", decodedToken.StatusAdmin);

            var ro = localStorage.getItem("role");
            switch (ro.toString().trim()) {
              case 'superadmin':

                this.router.navigate(['/superadmin'])
                break;
              case 'admin':

                this.router.navigate(['/admin'])
                break;
              case 'agent':

                this.router.navigate(['/home'])
                break;
              case 'privateseller':

                this.router.navigate(['/privatesale'])
                break;
              case 'visitor':

                this.router.navigate(['/home']);
                break;

            }
          }

        }

        this.displayModal3 = false;
        this.displayModal = true;
      },
      err => {
        console.log(err);
      }

    )

  }
  navigate() {
    this.displayModal = false;
  }
  save() {
    var account: Account = this.addAccountForm.value;
    this.errorUsername = this.check.checkUser(account.username, this.accounts);
    this.errorEmail = this.check.checkEmail(account.email, this.accounts);
    this.errorPass = this.check.checkPass(account.passwords);
    this.errorRePass = account.passwords === this.repass ? "" : "Re-Password not match";
    this.errorPhone = this.check.checkString(account.phone, "Phone");

    account.username = account.username.trim();
    account.fullname = account.fullname.trim();
    account.phone = account.phone.trim();
    account.email = account.email.trim();
    account.addresss = account.addresss.trim();
    account.passwords = account.passwords.trim();

    if (this.errorUsername === "" && this.errorEmail === "" && this.errorPass === "" && this.errorRePass === "" && this.errorPhone === "") {
      this.displayModal3 = true;
      this.accountService.create(account).then(
        res => {

          var re: Result = res as Result;
          this.displayModal2 = true;
          if (re) {

            this.dialogTitle2 = "Success! You must check your email to accept your account";
            this.repass = "";
            this.addAccountForm = this.formBuilder.group({
              username: '',
              passwords: '',
              accrole: "5",
              fullname: '',
              addresss: '',
              phone: '',
              photo: 'noavatar.jpg',
              email: '',
              accstatus: 0


            });
            this.displayModal3 = false;


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
  showModalDialog() {
    this.displayModal = true;

  }

  navigateRegister() {
    this.displayModal2 = false;
    window.location.reload();
  }

  showResetPassDialog() {
    this.displayModal4 = true;
  }
  resetPassEvent() {

    this.errorResetPass = this.check.checkExist(this.usernameResetPass, this.accounts);
    if (this.errorResetPass === "") {

      this.checkTime = true;
      this.displayModal3 = true;
      this.accountService.sendVerifyCode(this.usernameResetPass).then(res => {
        var a = res as string;
        if (a != "error") {
          this.verifyCodeSend = a;
        }

      });

      setTimeout(() => {
        this.checkTime = false;
      }, 60000);
      this.displayModal3 = false;
      this.displayModal4 = false;
      this.displayModal5 = true;

    }
  }

  verifyEvent() {
    if (this.checkTime) {
      if (this.verifyCode === this.verifyCodeSend) {

        this.errorVerify = ""
        this.displayModal3 = true;

        this.accountService.sendResetPass(this.usernameResetPass).then(res => {
          var a = res as string;
          if (a != "error") {
            this.displayModal6 = true;

            this.dialogTitle3 = "Success please check email to get password";
          }
          this.displayModal3 = false;
          this.displayModal5 = false;
        });
      } else {
        this.errorVerify = "Invalid Code";
      }
    } else {
      this.errorVerify = "Time is out";
      this.displayModal5 = false;
    }
  

  }

  reload() {

  }
}
