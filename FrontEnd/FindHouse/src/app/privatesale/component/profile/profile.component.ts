import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { AccountService } from 'src/app/services/account.service';
import { Check } from 'src/app/services/validation.service';
@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  accounts: Account[];
  username:string;
  account:Account;
  oldaccout:Account;
  editAccountForm: FormGroup;

  uploadedFiles: any[] = [];

  errorFullname: string;
  errorPhone: string;
  errorEmail: string;
  file: any
  getphoto: any

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private check: Check,
    private router: Router) {

  }
 
  ngOnInit(): void {
    this.accountService.findAll().then(
      res => {
        this.accounts = res as Account[];
      },
      err => {
        console.log(err);
      }

    );
    this.reload()
  }

  reload(){
    this.username=localStorage.getItem("username");
    this.accountService.findByUsername(this.username).then(
    trueresult =>{         
      this.account= trueresult as Account;
      this.editAccountForm = this.formBuilder.group({
        fullname: this.account.fullname,
        addresss: this.account.addresss,
        phone: this.account.phone,
        email: this.account.email,
        username: this.account.username,
        accrole: this.account.accrole,
        accstatus: this.account.accstatus,
   })
           
    },
    erros=>{
      console.log(erros);
    });
  }

  save(){
    this.errorEmail="";
    this.accountService.findByUsername(this.username).then(
      trueresult =>{         
        this.oldaccout= trueresult as Account;       
        var account: Account  = this.editAccountForm.value;

        if(account.email.trim() == null || account.email.trim() == ""){
          this.errorEmail = "email can't null";
          
        }else{
          if(this.oldaccout.email==account.email && this.oldaccout.phone !=account.phone && this.oldaccout.fullname==account.fullname)
          {
           
            this.errorEmail ="";
            this.errorPhone = this.check.checkPhone(account.phone.trim());
            this.errorFullname = "";
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.router.navigate(['/reload'])
                      this.reload();
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }else if(this.oldaccout.email==account.email && this.oldaccout.phone ==account.phone && this.oldaccout.fullname!=account.fullname){
          
            this.errorEmail ="";
            this.errorPhone = "";
            this.errorFullname = this.check.checkFullname(account.fullname);
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.router.navigate(['/reload'])
                      this.reload();
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email==account.email && this.oldaccout.phone !=account.phone && this.oldaccout.fullname!=account.fullname){
        
            this.errorEmail ="";
            this.errorPhone = this.check.checkPhone(account.phone.trim());
            this.errorFullname = this.check.checkFullname(account.fullname);
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.reload();
                      this.router.navigate(['/reload'])
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email!=account.email && this.oldaccout.phone !=account.phone && this.oldaccout.fullname==account.fullname){
       
            this.errorEmail = this.check.checkEmail(account.email, this.accounts);
            this.errorPhone = this.check.checkPhone(account.phone.trim());
            this.errorFullname = "";
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.router.navigate(['/reload'])
                      this.reload();
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email!=account.email && this.oldaccout.phone ==account.phone && this.oldaccout.fullname!=account.fullname){
         
            this.errorEmail = this.check.checkEmail(account.email, this.accounts);
            this.errorPhone = "";
            this.errorFullname = this.check.checkFullname(account.fullname);
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.router.navigate(['/reload'])
                      this.reload();
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email!=account.email && this.oldaccout.phone ==account.phone && this.oldaccout.fullname==account.fullname){
          
            this.errorEmail = this.check.checkEmail(account.email, this.accounts);
            this.errorPhone = "";
            this.errorFullname = "";
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.router.navigate(['/reload'])
                      this.reload();
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email!=account.email && this.oldaccout.phone !=account.phone && this.oldaccout.fullname!=account.fullname){
        
            this.errorPhone = this.check.checkPhone(account.phone.trim());
            this.errorFullname = this.check.checkFullname(account.fullname);
            this.errorEmail = this.check.checkEmail(account.email, this.accounts);
            if(this.errorFullname == "" && this.errorPhone =="" && this.errorEmail == ""){
              this.accountService.updateAccount(this.username, account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                      this.reload();
                      this.router.navigate(['/reload'])
                      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
                this.reload();
            }
          }
          else if(this.oldaccout.email==account.email && this.oldaccout.phone ==account.phone && this.oldaccout.fullname==account.fullname){
         
            this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Info No Change!'});
          }
        }  
      },
      erros=>{
        console.log(erros);
      });  
  }

  selectFile(e: any){
    this.file = e.target.files[0]
  }

  upload(){
    let formData = new FormData()
    formData.append('file', this.file);
    this.accountService.uploadAvatar(formData).then(
      trueresult =>{         
       this.getphoto = trueresult as any
       console.log("photo: " + this.getphoto.photo)
       this.account.photo = this.getphoto.photo
       this.accountService.updateAvatar(this.username, this.account).then(
                res =>{
                    var resl: ResultAPI = res as ResultAPI;
                    if(resl.result){
                        this.reload();
                        this.messageService.add({severity: 'info', summary: 'Change avatar success!', detail: ''});
                        this.router.navigate(['/reload'])
                        console.log('OK'); 
                    } else{
                      this.messageService.add({severity: 'error', summary: 'Upload fail!', detail: ''});
                        console.log('Fail');
                    }
               },
               err =>{
                    console.log(err);
               });     
      },
      erros=>{
        console.log(erros);
      });

  }
}
 