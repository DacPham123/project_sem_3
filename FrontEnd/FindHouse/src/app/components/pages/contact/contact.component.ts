import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Result } from 'src/app/models/result.model';
import { ContactService } from 'src/app/services/contact.service';
import { Check } from 'src/app/services/validation.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {

  errorFullname: string;
  errorEmail: string;
  errorPhone: string;
  errorSubject: string;
  errorMessage: string;
  addContactForm: FormGroup;
  displayModal:boolean;
  dialogTitle:string;
  constructor(private formBuilder: FormBuilder, private check : Check, private contactSer:ContactService) { }

  ngOnInit(): void {

    this.addContactForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',

    });
  }
  addContact() {
     var contact : Contact =  this.addContactForm.value;
     this.errorFullname= this.check.checkString(contact.name,"Name");
     this.errorEmail= this.check.checkString(contact.email,"Email");
     this.errorPhone= this.check.checkString(contact.phone,"Phone");
     this.errorSubject= this.check.checkString(contact.subject,"Subject");
     this.errorMessage= this.check.checkString(contact.message,"Message");
     
     if (this.errorFullname===""&&this.errorEmail===""&&this.errorPhone===""&&this.errorSubject===""&&this.errorMessage==="") {
      this.contactSer.send(contact).then(
        res => {
          var re: Result = res as Result;
          if (re) {
            this.displayModal=true; 
            this.dialogTitle="Success";

            this.addContactForm = this.formBuilder.group({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
        
            });
          } else {
            this.dialogTitle="Failed";
            
          }
        }
        , err => {
          this.dialogTitle="Failed";
          console.log(err);
        }
      )
     }
  }
}
