import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Account } from "../models/account.model";
import { AccountService } from "./account.service";

@Injectable()
export class Check {
    checkUs: boolean;
    checkEm: boolean;
    checkReset: boolean;
    checkName: boolean;
    checkphone: boolean


    constructor(private accSer: AccountService) {


    }
    checkString(str: string, field: string): string {
        var a: string = "";
        var string: string = str.trim();
        if (string == "" || string == null) {
            a = field + " can not be left blank";
        } else if (string.length > 100) {
            a = field + " no more than 100 characters";
        } else {
            a = "";
        }

        return a;
    }
    checkUser(str: string, accounts: Account[]): string {
        var a: string = "";
        this.checkUs = false;
        var userRegex = new RegExp("^[a-zA-Z0-9]{1,}$");
        var string: string = str.trim().toLowerCase();
        accounts.forEach(s => {
            if (s.username.toLowerCase() === string) {
                this.checkUs = true;

            }
        })

        if (string == "" || string == null) {
            a = "Username can not be left blank";
        } else if (string.length > 25) {
            a = "Username no more than 25 characters";
        } else if (this.checkUs) {
            a = "Username is already exists";
        } else if (!userRegex.test(string)) {
            a = "Username only enter letters";
        } else {
            a = "";

        }
        return a;

    }
    checkEmail(str: string, accounts: Account[]): string {
        // "^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$"
        var a: string = "";
        this.checkEm = false;
        var mailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
        var string: string = str.trim();
        accounts.forEach(s => {
            if (s.email === str) {
                this.checkEm = true;
            }
        })

        if (string == "" || string == null) {
            a = "Email can not be left blank";
        } else if (string.length > 100) {
            a = "Email no more than 100 characters";
        } else if (!mailRegex.test(string)) {
            a = "Email invalid";
        } else if (this.checkEm) {
            a = "Email is already exists";
        } else {
            a = "";

        }
        return a;
    }
    checkPass(pass: string): string {
        var a: string = "";
        var password: string = pass.trim();
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,10})");
        if (!strongRegex.test(pass)) {
            console.log(strongRegex.test(pass));
            a = "1 uppercase,1 lowercase,1 number and 1 special 6-10 characters ";
        }


        return a;
    }
    checkExist(str: string, accounts: Account[]): string { // co thay doi 
        var a: string = "1";
        accounts.forEach(s => {
            if (s.username.toLowerCase() === str.trim().toLowerCase()) {
                if (s.accstatus == 0) {
                    a = "Account not activated";
                } else if (s.accstatus == 3) {
                    a = "The account is locked because the admin has locked the account";
                } else if (s.accstatus == 4) {
                    a = "The account is locked because the super admin has locked the account";
                } else {

                    a = "";
                }
            }
        })
        if (a === "1") {
            a = "Account not exist";
        }
        return a;
    }
    checkSmall(str: string, field: string): string {

        var a: string = "";

        var string: string = str.trim();
        if (string == "" || string == null) {
            a = field + " can not be left blank";
        } else if (string.length > 30) {
            a = field + " no more than 30 characters";
        } else {
            a = "";
        }

        return a;
    }
      //========================Lan code===============================
      checkTitle(title: string): string {
        var result: string = "";
        var checktitle: string = title.trim().toLowerCase();
        var forbiddenwords: any = ["shit", "piss", "fuck", "cunt", "motherfucker", "tits", "kill", "gun", "racist", "sexist", "ageist", "homophobic"]
        if (checktitle == "" || checktitle == null) {
            result = "Title can not be blank";
        } else if (checktitle.length > 200) {
            result = "Title no more than 200 characters";
        }else if (forbiddenwords.some(element => checktitle.includes(element)) == true){
            result = "Title contain forbidden words";
        }
         else {
            result = "";
        }
        return result;
    }

    checkContent(content: string): string {
        var result: string = "";
        var checkcontent: string = content.trim().toLowerCase();
        var forbiddenwords: any = ["shit", "piss", "fuck", "cunt", "motherfucker", "tits", "kill", "gun", "racist", "sexist", "ageist", "homophobic"]
        if (checkcontent == "" || checkcontent == null) {
            result = "Content can not be blank";
        } else if (checkcontent.length < 50) {
            result = "Content must at least 50 characters";
        }else if (forbiddenwords.some(element => checkcontent.includes(element)) == true){
            result = "Content contain forbidden words";
        }
        else {
            result = "";
        }
        return result;
    }

    checkNull(field: number): string {
        var result: string = "";
        var check: number = field;
        if ( check == null) {
            result = "Please, fill this field!";
        } else {
            result = "";
        }
        return result;
    }

    //only alphabets with spaces
    checkFullname(name: string): string {
        var a: string = "";
        var nameRegex = new RegExp("^[a-zA-Z ]*$");
        if (name == "" || name == null) {
            a = "Fullname can not be blank";
        } else if (name.length > 100) {
            a = "Fullname no more than 100 characters";
        } else if (!nameRegex.test(name)) {
            a = "Fullname only enter letters";
        } else {
            a = "";
        }
        return a;
    }

     //only phone number
     checkPhone(phone: string): string {
        var a: string = "";
        var phoneRegex = new RegExp('^[0-9]*$');
        if (!phoneRegex.test(phone)) {
            a = "Number phone invalid!";
        } else {
            a = "";
        }
        return a;
    }
}