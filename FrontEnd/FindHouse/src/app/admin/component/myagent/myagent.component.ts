import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { NewsTable } from 'src/app/models/newstable.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { AccountService } from 'src/app/services/account.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { formatDate } from "@angular/common";
import {DialogModule} from 'primeng/dialog';
import { Check } from 'src/app/services/validation.service';
import { Result } from 'src/app/models/result.model';


@Component({
  templateUrl: './myagent.component.html',
})
export class MyAgentComponent implements OnInit, AfterContentChecked {

  useradmin:string;
  customers: Account[];
  selectedCustomers: Account[];
  loading: boolean = true;
  user:Account;
  listnewsagent:News[];
  news:NewsTable;
  account:Account;
  oldacc:Account;
  displayconfirmedit: boolean = false;
  display: boolean = false;
  editdisplay: boolean = false;
  warning1: boolean = false;
  warning2: boolean = false;
  warning3: boolean = false;
  displayerross: boolean = false;

  editAccountForm:FormGroup;
  errorPhone: string;
  errorEmail: string;
  accounts: Account[];
  errorUsername: string;
  errorFullName: string;
  addAccountForm: FormGroup;
  customerDialog: boolean;

  dialogTitle2: string
  displayModal2: boolean= false;
  displayModal3: boolean= false;
  displayModal4: boolean= false;
  display1: boolean= false;
  newacc:Account;
  constructor(
    private accSer: AccountService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private newsservice:NewsService,
    private newsTableService:NewsTableService,
    private formBuider:FormBuilder,
    private check: Check,
    private cdref: ChangeDetectorRef
  ) {}
  ngAfterContentChecked() { // thêm đoạn này

    this.cdref.detectChanges();

}
  ngOnInit(): void {
    this.account=null;
    this.useradmin=localStorage.getItem("username");
    this.accSer.getlistagent(this.useradmin).then(
      res => {
        this.customers = res as Account[];
        this.loading = false;
      },
      err => {
        console.log(err)
      }
    );
    this.errorUsername="";
    this.errorEmail="";
    this.errorPhone="";
    this.addAccountForm = this.formBuider.group({
      username: '',
      passwords: '',
      accrole: 3,
      fullname: '',
      addresss: '',
      phone: '',
      photo: 'noavatar.jpg',
      email: '',
      accstatus: 0,
      agentuser:this.useradmin

    });
  }
  activeuser(username:string,userstt:number){
    this.accSer.findByUsername(username).then(
      res => {
        this.user = res as Account;
        this.user.accstatus=userstt;
        switch (userstt) {
          case 1:
            this.activeto1(username, this.user);
           
            break;
          case 3:
            this.activeto3(username, this.user);
            break;
          
          default:
          break;
        }
       
      },
      err => {
        console.log(err)
      }
    )
 
    
  }

  activeto1(username:string,user:Account){
    this.display1=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to set active this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {       
        this.display1=false;
        this.displayModal3 = true;
        this.accSer.updateAccount(username, this.user).then(
          res => {
            var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){

                 this.accSer.sendemail(username).then(
                    resu => {
                      var resls: ResultAPI=resu as ResultAPI  ;
                          if(!resls.result){
                            this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Account Actived and Email send'});
                            this.accSer.getlistagent(this.useradmin).then(
                              res => {
                                this.customers = res as Account[];
                               
                              },
                              err => {
                                console.log(err)
                              })
                              this.displayModal3 = false;
                          }else{
                            this.messageService.add({severity:'error', summary: 'Error', detail: 'Accout has been set active but can not send email'});
                            this.displayModal3 = false;
                          }

                    },
                    err => {
                      console.log(err);
                    }
                  )
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! account still lock '});
                  this.display1=false;
                  this.displayModal3 = false;
                }           
           
          },
          err => {
            console.log(err);
          }
        )
        
      },
      reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
        this.display1=false;
    }
    });
  }
  activeto3(username:string,user:Account){
    this.display1=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to lock this account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {       
        this.accSer.updateAccount(username, this.user).then(
          res => {
            var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Account Locked'});
                  this.changetypenews(username);
                  this.accSer.getlistagent(this.useradmin).then(
                    res => {
                      this.customers = res as Account[];
                      this.display1=false;
                    },
                    err => {
                      console.log(err)
                    })
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                  this.display1=false;
                }
           
          },
          err => {
            console.log(err);
          }
        )
        
      },
      reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                
            break;
        }
        this.display1=false;
    }
    });
  }

  changetypenews(useragent:string){
    this.newsservice.getlistnewsagent(useragent).then(
      res => {
       this.listnewsagent= res as News[];
       if(this.listnewsagent.length >0){
         for(var i=0;i<this.listnewsagent.length;i++){
           this.news={
            newsid: this.listnewsagent[i].newsid,
            createdate:formatDate(this.listnewsagent[i].createdate,'yyyy-MM-dd','en-US'),
            categoryid: this.listnewsagent[i].categoryid,
            cateTofhouseid: this.listnewsagent[i].cateTofhouseid,
            title: this.listnewsagent[i].title,
            content: this.listnewsagent[i].content,
            acreage: this.listnewsagent[i].acreage,
            nobedroom: this.listnewsagent[i].nobedroom,
            nolivroom: this.listnewsagent[i].nolivroom,
            nobathroom: this.listnewsagent[i].nobathroom,
            garden: this.listnewsagent[i].garden,
            bancony: this.listnewsagent[i].bancony,
            wardid: this.listnewsagent[i].wardid,   
            price: this.listnewsagent[i].price,
            newstypeid: this.listnewsagent[i].newstypeid,
            adstimefrom: formatDate(this.listnewsagent[i].adstimefrom,'yyyy-MM-dd','en-US') ,
            adstimeto: formatDate(this.listnewsagent[i].adstimeto,'yyyy-MM-dd','en-US')  ,
            username: this.listnewsagent[i].username,
            newstatus: 5,
           }
          this.newsTableService.update(this.news).then(
            res => {
              var resl: ResultAPI=res as ResultAPI  ;              
            },
            err => {
              console.log(err);
            }
          )
         }
       }
      },
      err => {
        console.log(err)
      }
    )
  }


  showInfo(useragent:string){
    this.display = true;
    this.accSer.findByUsername(useragent).then(
      trueresult =>{         
        this.account= trueresult as Account; 
      },
      erros=>{
        console.log(erros);
      }        
    );
  }

  showEdit(useragent:string){

    this.display = false;
    this.editdisplay=true;
    this.accSer.findByUsername(useragent).then(
      trueresult =>{         
        this.account= trueresult as Account; 
        this.oldacc=this.account;
  
        this.editAccountForm=this.formBuider.group({
          username: this.account.username,
          fullname:this.account.fullname,
          addresss: this.account.addresss,
          phone:this.account.phone,
          photo:this.account.photo,
          email:this.account.email,
          accrole:this.account.accrole,
          accstatus:this.account.accstatus
        

      });
      },
      erros=>{
        console.log(erros);
      }        
    );
  }
  update(){
    this.errorPhone="";
    this.errorEmail="";  
    this.account =this.editAccountForm.value;

    this.accSer.findAll().then(
      res => { 
        this.accounts = res as Account[] ;
    if(this.account.email ==this.oldacc.email && this.account.phone !=this.oldacc.phone)
    {
      this.warning1=true;
      this.errorEmail="";     
      this.errorPhone = this.check.checkString(this.account.phone, "Phone");
    }else if(this.account.email !=this.oldacc.email && this.account.phone ==this.oldacc.phone){
      this.warning2=true;     
      this.errorPhone="";
      this.errorEmail = this.check.checkEmail(this.account.email,this.accounts);
    }
    else if (this.account.email ==this.oldacc.email && this.account.phone ==this.oldacc.phone){
      this.warning3=true;
      this.editdisplay=false;
    }
    else{
      this.errorPhone = this.check.checkString(this.account.phone, "Phone");
      this.errorEmail = this.check.checkEmail(this.account.email,this.accounts);      
    }
    if(this.errorPhone=="" && this.errorEmail==""){
      this.accSer.updateAccount(this.account.username,this.account).then(
        trueresult =>{         
          var resl: ResultAPI=trueresult as ResultAPI  ;
                if(resl.result){
                  this.editdisplay=false;
                  this.displayconfirmedit=true;
                }else{
                  this.editdisplay=false;
                  this.displayerross=true;
                }
        },
        erros=>{
          console.log(erros);
        }        
      );
     }

      },
       err => {
         console.log(err) 
        })   
  }
  save(){
   
    this.errorUsername="";
    this.errorEmail="";
    this.errorPhone="";
    this.newacc = this.addAccountForm.value;
    this.accSer.findAll().then(
      res => 
      { 
        this.accounts = res as Account[] 
        this.newacc.username = this.newacc.username.trim();
    this.newacc.phone = this.newacc.phone.trim();
    this.newacc.email = this.newacc.email.trim();
    this.errorUsername = this.check.checkUser(this.newacc.username, this.accounts);
    this.errorEmail = this.check.checkEmail(this.newacc.email, this.accounts);
    this.errorPhone = this.check.checkString(this.newacc.phone, "Phone");
    this.errorFullName=this.check.checkFullname(this.newacc.fullname);


    if (this.errorUsername === "" && this.errorEmail === "" && this.errorPhone === "" && this.errorFullName =="") {
      this.displayModal3 = true;
      this.accSer.createBySuperAdmin(this.newacc).then(
        res => {

          var re: Result = res as Result;
          this.displayModal2 = true;
          if (re) {
            this.accSer.getlistagent(this.useradmin).then(
              res => {
                this.customers = res as Account[];
                this.loading = false;
              },
              err => {
                console.log(err)
              }
            );
            this.dialogTitle2 = "Success! Info account sent to account's email ";
            this.addAccountForm = this.formBuider.group({
              username: '',
              passwords: '',
              accrole: 3,
              fullname: '',
              addresss: '',
              phone: '',
              photo: 'noavatar.jpg',
              email: '',
              accstatus: 1,
              agentuser:this.useradmin


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
      }, 
      err => 
      { 
        console.log(err) 
      })
    
    
  }
  openNew() {
    this.errorUsername="";
    this.errorEmail="";
    this.errorPhone="";
    this.addAccountForm = this.formBuider.group({
      username: '',
      passwords: '',
      accrole: 3,
      fullname: '',
      addresss: '',
      phone: '',
      photo: 'noavatar.jpg',
      email: '',
      accstatus: 0,
      agentuser:this.useradmin

    });
    this.customerDialog = true;
 
  }
  reload(){
    this.router.navigate(['/admin/reloadpage/',{newsid: 0}]);
  }
 
}
 