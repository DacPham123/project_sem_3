import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Package } from 'src/app/models/package.model';
import { PackageDac } from 'src/app/models/packageDac.model';
import { PackageService } from 'src/app/services/package.service';
import { Check } from 'src/app/services/validation.service';

@Component({
  templateUrl: './addAndUpdate.component.html',
})
export class AddUpdatePackage implements OnInit {

  addPackage: FormGroup;
  errorTitle: string;
  errorPrice: string;
  errorDays: string;
  errorVip: string;
  errorSpecial: string;
  errorNormal: string;
  errorContent: string;
  default: number;
  sttUp: boolean;
  id: number;
  constructor(
    private formBuilder: FormBuilder, private pacSer: PackageService, private check: Check, private message: MessageService, private activateRoute: ActivatedRoute, private router: Router,private confirmationService:ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.sttUp = false;
    this.addPackage = this.formBuilder.group({
      packageId: 0,
      packagetitle: '',
      packageprice: 0,
      packagedate: 1,
      noVVipnews: 0,
      noVipnews: 0,
      noNormalnews: 0,
      packagecontent: ''
    })
    this.activateRoute.paramMap.subscribe(param => {
      var str = param.get('id');
      var id: number = parseInt(str);
      if (str != null && str != "") {
        this.sttUp = true;
        this.pacSer.getById(id).then(
          res => {
            var re = res as PackageDac;
            this.addPackage = this.formBuilder.group({
              packageId: re.packageid,
              packagetitle: re.packagetitle,
              packageprice: re.packageprice,
              packagedate: re.packagedate,
              noVVipnews: re.noVVipnews,
              noVipnews: re.noVipnews,
              noNormalnews: re.noNormalnews,
              packagecontent: re.packagecontent
            })
          }, err => {
            console.log(err);
          }
        )
      } else {
        this.sttUp = false;
        this.addPackage = this.formBuilder.group({
          packageid: 0,
          packagetitle: '',
          packageprice: 0,
          packagedate: 1,
          noVVipnews: 0,
          noVipnews: 0,
          noNormalnews: 0,
          packagecontent: ''
        })
      }

    });
    this.default = 1;

  }
  save() {

    var pack: PackageDac = this.addPackage.value
    if (pack.packageprice == null) {
      this.errorDays = "Days not blank";
    } else if (pack.packageprice == 0) {
      this.errorDays = "Days must be 1 or more";
    } else {
      this.errorDays = ""
    }
    this.errorDays = pack.packagedate == null ? "Days not blank" : ""
    this.errorContent = this.check.checkString(pack.packagecontent, 'Content');
    this.errorTitle = this.check.checkString(pack.packagetitle, 'Title');
    this.errorVip = pack.noVVipnews === null ? "Vip not blank" : ""
    this.errorSpecial = pack.noVipnews === null ? "Special not blank" : ""
    this.errorNormal = pack.noNormalnews === null ? "Normal not blank" : ""
    if (pack.packageprice == null) {
      this.errorPrice = "Price not blank"
    } else if (pack.packageprice == 0) {
      this.errorPrice = "Price not equal 0"
    } else {
      this.errorPrice = ""
    }

    if (this.errorTitle === "" && this.errorDays === "" && this.errorPrice === "" && this.errorVip === "" && this.errorSpecial === "" && this.errorNormal === "" && this.errorContent === "") {
      if (!this.sttUp) {
        if (pack.noVVipnews == 0 && pack.noVipnews == 0 && pack.noNormalnews == 0) {
          this.message.add({ severity: 'error', summary: 'Error', detail: "Must be have 1 news in package" });
        } else {
          this.confirmationService.confirm({
            message: 'Are you sure add this package? If you add this package you cant delete it',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
          this.pacSer.create(pack).then(
            res => {
              var re = res as boolean;
              if (re) {
                alert("Add Success");
              this.router.navigate(['/superadmin/package']);
                //this.message.add({ severity: 'success', summary: 'Success', detail: "Add Package Success" });
                this.addPackage = this.formBuilder.group({
                  packageid: 0,
                  packagetitle: '',
                  packageprice: '',
                  packagedate: 1,
                  noVVipnews: 0,
                  noVipnews: 0,
                  noNormalnews: 0,
                  packagecontent: ''
                })
              } else {
                this.message.add({ severity: 'error', summary: 'Error', detail: "" });
              }
            },
            err => {
              console.log(err);
              this.message.add({ severity: 'error', summary: 'Error', detail: "" });
            }
          )}})
        }
      }else {
          this.pacSer.update(pack).then(
            res=>{
              var re = res as boolean
              if (re) {
                //this.message.add({ severity: 'success', summary: 'Success', detail: "Update Package Success" });
                alert("Update Success");
                this.router.navigate(['/superadmin/package']);
                this.addPackage = this.formBuilder.group({
                  packageid: 0,
                  packagetitle: '',
                  packageprice: '',
                  packagedate: 1,
                  noVVipnews: 0,
                  noVipnews: 0,
                  noNormalnews: 0,
                  packagecontent: ''
                })
              
              } else {
                this.message.add({ severity: 'error', summary: 'Error', detail: "" });
              }
            }
          )
      }
    } 

  }
  defaults() {

    this.default = 1;
  }


}
