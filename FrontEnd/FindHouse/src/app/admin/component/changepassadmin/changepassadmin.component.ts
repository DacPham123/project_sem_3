import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangePassModel } from 'src/app/models/changePass.model';
import { LoginModel } from 'src/app/models/login.model';
import { Result } from 'src/app/models/result.model';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { Check } from 'src/app/services/validation.service';

@Component({
  templateUrl: './changepassadmin.component.html',
})
export class ChangePassAdminComponent implements OnInit {
  
  changePassForm: FormGroup;
  errorPass: string;
  errorNewPass: string;
  errorReNewPass: string;

  constructor(
    private formBuilder: FormBuilder, 
    private accSer: AccountService, 
    private loSer: LoginService, 
    private check: Check, 
    private messageService: MessageService
  ) {
 }

  ngOnInit(): void {
    this.changePassForm = this.formBuilder.group({
      password: "",
      newPassword: "",
      confirmPassword: ''
    })
  }
  changePass() {
    var change: ChangePassModel = this.changePassForm.value;

    var lo: LoginModel = {
      username: '',
      password: ''
    };
    var user = localStorage.getItem('username');
    lo.username = user,
    lo.password = change.password,

   


    this.loSer.checkLogin(lo).then(
      res => {
        var token = res as string;
        this.errorNewPass = this.check.checkPass(change.newPassword);
        this.errorReNewPass = change.confirmPassword == change.newPassword ? "" : "Confirm Password not match";
        if (token == "Invaid creadentials") {
          this.errorPass = "Wrong Password";
        } else {
          this.errorPass = "";
          if (this.errorPass == "" && this.errorNewPass == "" && this.errorReNewPass == "") {
            lo.password = change.newPassword;
            this.accSer.changePassword(lo).then(
              res => {
                var re = res as Result;
                if (re.result) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Change password Success' });
                  this.changePassForm = this.formBuilder.group({
                    password: "",
                    newPassword: "",
                    confirmPassword: ''
                  })
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
                }

              }, err => { console.log(err); this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' }); }
            );
          }
        }

      }

    );

  }
  
}
 