import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { Result } from 'src/app/models/result.model';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { Check } from 'src/app/services/validation.service';

@Component({
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categories: CateOfHouse[];
  displayModal: boolean;
  dataSet: string;
  errorText: string;
  addCate: FormGroup;
  stt: boolean;
  idUp: number;
  constructor(private cateSer: CateTOFhouseService, private formBuil: FormBuilder, private check: Check, private message: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.cateSer.showalldes().then(
      res => {
        this.categories = res as CateOfHouse[]
      },
      err => {
        console.log(err);
      }
    );
    this.addCate = this.formBuil.group({
      cateTofhouseid: 0,
      cateTofhousename: ''
    })
  }
  save() {
    var cate = this.addCate.value as CateOfHouse;
    this.errorText = this.check.checkSmall(cate.cateTofhousename, 'Category');


    if (this.errorText == "") {
      if (this.stt) {
        this.confirmationService.confirm({
          message: 'Are you sure add this category?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.cateSer.addCateOfHouse(cate).then(
              res => {
                this.displayModal = false;
                var re = res as Result;
                if (re.result) {
                  this.message.add({ severity: 'success', summary: 'Success', detail: "" });
                } else {
                  this.message.add({ severity: 'error', summary: 'Error', detail: "" });
                }
                this.cateSer.showalldes().then(
                  res => {
                    this.categories = res as CateOfHouse[]
                  },
                  err => {
                    console.log(err);
                  }
                );
                this.addCate = this.formBuil.group({
                  cateTofhouseid: 0,
                  cateTofhousename: ''
                })
              },
              err => {
                this.displayModal = false;
                console.log(err);
                this.message.add({ severity: 'error', summary: 'Error', detail: "" });
              }
            )
          }
        })
      } else {
        this.confirmationService.confirm({
          message: 'Are you sure update this category?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.cateSer.updateCateOfHouse(cate).then(
              res => {
                this.displayModal = false;
                var re = res as Result;
                if (re.result) {
                  this.message.add({ severity: 'success', summary: 'Success', detail: "" });
                } else {
                  this.message.add({ severity: 'error', summary: 'Error', detail: "" });
                }
                this.cateSer.showalldes().then(
                  res => {
                    this.categories = res as CateOfHouse[]
                  },
                  err => {
                    console.log(err);
                  }
                );
                this.addCate = this.formBuil.group({
                  cateTofhouseid: 0,
                  cateTofhousename: ''
                })
              },
              err => {
                this.displayModal = false;
                console.log(err);
                this.message.add({ severity: 'error', summary: 'Error', detail: "" });
              })
          }
        })
      }
    }



  }
  deleteC(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cateSer.delete(id).then(
          res => {
            var re = res as number;
            switch (re) {

              case 0:
                
                this.message.add({ severity: 'error', summary: 'Error', detail: '' });
                break;
              case 1:

                this.message.add({ severity: 'success', summary: 'Success', detail: 'Delete Category Success' });
                break;
              case 2:
                this.message.add({ severity: 'error', summary: 'Error', detail: 'News exists in this categoty' });
                break;
            }
            this.cateSer.showalldes().then(
              res => {
                this.categories = res as CateOfHouse[]
              },
              err => {
                console.log(err);
              }
            );
            this.addCate = this.formBuil.group({
              cateTofhouseid: 0,
              cateTofhousename: ''
            })
          },
          err => {
            console.log(err);
            this.message.add({ severity: 'error', summary: 'Error', detail: '' });
          }
        )
      }
    })

  }
  update(id: number, name: string) {
    this.displayModal = true;
    this.stt = false;
    this.idUp = id;
    this.addCate = this.formBuil.group({
      cateTofhouseid: id,
      cateTofhousename: name
    })
  }
}
