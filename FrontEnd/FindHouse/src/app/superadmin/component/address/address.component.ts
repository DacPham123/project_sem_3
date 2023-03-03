import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { City } from 'src/app/models/city.model';
import { CityAPi } from 'src/app/models/cityAPI.model';
import { Province } from 'src/app/models/province.model';
import { ProvinceAPI } from 'src/app/models/provinceAPI.model';
import { Result } from 'src/app/models/result.model';
import { Ward } from 'src/app/models/ward.model';
import { CityService } from 'src/app/services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { Check } from 'src/app/services/validation.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {

  cities: City[];
  selectedCity: City;
  sele: number;
  province: Province[];
  selectedProvince: Province;
  wards: Ward[];
  selectedWard: Ward;
  displayModal: boolean;
  errorText: string;
  func: string;
  addEditNumber: number;
  dataSet: string;
  input: string;
  constructor(private citySer: CityService, private provinSer: ProvinceService, private wardSer: WardService, private messageService: MessageService, private confirmationService: ConfirmationService, private check: Check) {

  }

  ngOnInit(): void {
    this.provinSer.showall().then(
      res => {
        this.province = res as Province[];
        this.selectedProvince = this.province[0];
        this.citySer.getCities(this.selectedProvince.provinceId).then(
          res => {
            this.cities = res as City[];
            if (this.cities.length > 0 && this.cities != null) {

              this.selectedCity = this.cities[0];
              this.wardSer.getWards(this.selectedCity.citiId).then(
                res => {
                  this.wards = res as Ward[];
                  if (this.cities.length > 0 && this.cities != null) {
                    this.selectedWard = this.wards[0];
                  } else {
                    this.selectedWard == null;
                  }

                },
                err => {
                  console.log(err);
                }
              )
            } else {
              this.selectedCity = null;
              this.selectedWard = null;
              this.wards = [];
            }
          },
          err => {
            console.log(err);
          }
        )
      }, err => { console.log(err) }
    );
  }
  changePro() {
    this.citySer.getCities(this.selectedProvince.provinceId).then(
      res => {
        this.cities = res as City[];

        if (this.cities.length > 0 && this.cities != null) {

          this.selectedCity = this.cities[0];
          this.wardSer.getWards(this.selectedCity.citiId).then(
            res => {
              this.wards = res as Ward[];
              this.selectedWard = this.wards[0];
            },
            err => {
              console.log(err);
            }
          )
        } else {
          this.selectedCity = null;
          this.selectedWard = null;
          this.wards = [];
        }

      },
      err => {
        console.log(err);
      });

  }
  changeCity() {
    this.wardSer.getWards(this.selectedCity.citiId).then(
      res => {
        this.wards = res as Ward[];
        if (this.cities.length > 0 && this.cities != null) {
          this.selectedWard = this.wards[0];
        } else {
          this.selectedWard == null;
        }

      },
      err => {
        console.log(err);
      }
    )
  }
  addProvince() {
    this.errorText="";
    this.displayModal = true;
    this.func = "Add province";
    this.addEditNumber = 1;
    this.dataSet = "";

  }
  updateProvince() {
    this.errorText="";
    this.displayModal = true;
    this.func = "Update province";
    this.addEditNumber = 2;
    this.dataSet = this.selectedProvince.provinceName;
  }
  addWard() {
    this.errorText="";
    this.displayModal = true;
    this.func = "Add ward in: " + this.selectedCity.citiName;
    this.addEditNumber = 3;
    this.dataSet = "";

  }
  updateWard() {
    this.errorText="";
    if (this.selectedWard != null) {
      this.displayModal = true;
      this.func = "Update ward";
      this.addEditNumber = 4;
      this.dataSet = this.selectedWard.wardName;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not Ward Selected' });
    }

  }
  addCity() {
    this.errorText="";
    this.displayModal = true;
    this.func = "Add city in: " + this.selectedProvince.provinceName;
    this.addEditNumber = 5;
    this.dataSet = "";

  }
  updateCity() {
    this.errorText="";
    if (this.selectedCity != null) {
      this.displayModal = true;
      this.func = "Update city";
      this.addEditNumber = 6;
      this.dataSet = this.selectedCity.citiName;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not City Selected' });
    }

  }
  deleteProvince() {
    this.provinSer.checkDelete(this.selectedProvince.provinceId).then(
      res => {
        var re = res as boolean;
        if (re) {
          this.confirmationService.confirm({
            message: 'Are you sure delete this province?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.provinSer.delete(this.selectedProvince.provinceId).then(
                res => {
                  var rs = res as boolean;
                  if (rs) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Province Success' });
                    this.selectedProvince = this.province[0];
                    this.loadAddress();
                  } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Province Failed' });
                  }


                },
                err => {
                  console.log(err);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Province Failed' });
                }
              )
            }
          })


        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cities exists in this province' });
        }
      }
    )


  }
  deleteCity() {

    this.citySer.checkDelete(this.selectedCity.citiId).then(
      res => {
        var re = res as boolean;
        if (re) {
          this.confirmationService.confirm({
            message: 'Are you sure delete this city?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.citySer.delete(this.selectedCity.citiId).then(
                res => {
                  var rs = res as boolean;

                  if (rs) {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete City Success' });
                    this.loadAddress();
                  } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete City Failed' });
                  }


                },
                err => {
                  console.log(err);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete City Failed' });
                }
              )
            }
          })

        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wards exists in this city' });
        }
      }
    )
  }
  deleteWard() {
    this.wardSer.checkDelete(this.selectedWard.wardId).then(
      res => {
        var re = res as boolean;
        if (re) {
          this.confirmationService.confirm({
            message: 'Are you sure delete this ward?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.wardSer.delete(this.selectedWard.wardId).then(
                res => {
                  var rs = res as boolean;
                  if (rs) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Ward Success' });
                    this.selectedProvince = this.province[0];
                    this.loadAddress();
                  } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Ward Failed' });
                  }


                },
                err => {
                  console.log(err);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Ward Failed' });
                }
              )
            }
          })


        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'News exists in this ward' });
        }
      }
    )
  }
  save() {

    switch (this.addEditNumber) {
      case 1:
        this.input = "Province";
        break;
      case 2:
        this.input = "Province";
        break;
      case 3:
        this.input = "Ward";
        break;
      case 4:
        this.input = "Ward";
        break;
      case 5:
        this.input = "City";
        break;
      case 6:
        this.input = "City";
        break;
    }
    this.errorText = this.check.checkSmall(this.dataSet, this.input)
    if (this.errorText == "") {


      switch (this.addEditNumber) {
        case 1:

          var po: ProvinceAPI = {
            provinceid: 0,

            provincename: this.dataSet
          }
          this.provinSer.createProvince(po).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Province Success' }); this.loadAddress() },
            err => (console.log(err))

          )
          break;
        case 2:
          var provin = {
            provinceid: this.selectedProvince.provinceId,
            provincename: this.dataSet
          }
          this.provinSer.updateProvince(provin).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Province Success' }); this.loadAddress() },
            err => (console.log(err))

          )

          break;
        case 3:
          var wa = {
            wardid: 0,
            wardname: this.dataSet,
            cityid: this.selectedCity.citiId
          }
          this.wardSer.createWard(wa).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Ward Success' }); this.loadAddress() },
            err => (console.log(err))

          )
          break;
        case 4:
          var wardd = {
            wardid: this.selectedWard.wardId,
            wardname: this.dataSet,
            cityid: this.selectedCity.citiId
          }
          this.wardSer.updateWard(wardd).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Ward Success' }); this.loadAddress() },
            err => (console.log(err))

          )
          break;
        case 5:
          var ci: CityAPi = {
            cityid: 0,
            cityname: this.dataSet,
            privinceid: this.selectedProvince.provinceId
          }
          this.citySer.createCity(ci).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add City Success' }); this.loadAddress() },
            err => (console.log(err))

          )
          break;
        case 6:
          var cit = {
            cityid: this.selectedCity.citiId,
            cityname: this.dataSet,
            privinceid: this.selectedProvince.provinceId
          }
          this.citySer.updateCity(cit).then(
            res => { var re = res as Result; this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update City Success' }); this.loadAddress() },
            err => (console.log(err))

          )
          break;


      }
      this.displayModal = false
    }
   

  }

  loadAddress() {
    this.provinSer.showall().then(
      res => {
        this.province = res as Province[];
        this.selectedProvince = this.selectedProvince;
        this.citySer.getCities(this.selectedProvince.provinceId).then(
          res => {
            this.cities = res as City[];
            this.selectedCity = this.selectedCity;
            if (this.cities.length > 0 && this.cities != null) {

              this.selectedCity = this.cities[0];
              this.wardSer.getWards(this.selectedCity.citiId).then(
                res => {
                  this.wards = res as Ward[];
                  if (this.cities.length > 0 && this.cities != null) {
                    this.selectedWard = this.wards[0];
                  } else {
                    this.selectedWard == null;
                  }

                },
                err => {
                  console.log(err);
                }
              )
            } else {
              this.selectedCity = null;
              this.selectedWard = null;
              this.wards = [];
            }
          },
          err => {
            console.log(err);
          }
        )
      }, err => { console.log(err) }
    );
  }

}
