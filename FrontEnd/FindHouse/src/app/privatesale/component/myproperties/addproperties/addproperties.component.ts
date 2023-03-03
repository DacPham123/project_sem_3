import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService, SelectItem} from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { News } from 'src/app/models/news.model';
import { NewImages } from 'src/app/models/newsimagesl.model';
import { NewsTable } from 'src/app/models/newstable.model';
import { Province } from 'src/app/models/province.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { Ward } from 'src/app/models/ward.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { CityService } from 'src/app/services/city.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { ProvinceService } from 'src/app/services/province.service';
import { Check } from 'src/app/services/validation.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  templateUrl: './addproperties.component.html',
})

export class AddPropertiesComponent implements OnInit {
   
  // selectedProvince: string

  // keyword: string;
  // keywords: string[];
  // filteredProvinces: any[];
  // provinces: Province[]
  createnews: NewsTable
  username: string
  addNews: FormGroup;
  title: string
  createdate: string
  content: string
  provinceId: number
  citiId: number
  wardid:number
  price: number
  categoryid:number
  cateTofhouseid:number
  acreage:number
  nolivroom: number
  nobedroom: number
  nobathroom: number
  garden: number
  bancony: number

  errorTitle: string
  errorContent: string
  errorAddress: string
  errorStatus: string
  errorCategory: string
  errorPrice: string
  errorAcreage: string
  errorNoBed: string
  errorNoBath: string
  errorNoLiv: string
  errorGarden: string
  errorBalcony: string

  newsid: number
  citylist:City[];
  getcity:City;

  provincelist:Province[];
  getprovince:Province;

  wardlist:Ward[];
  getward:Ward;

  catlist: Category[];
  catHouselist: CateOfHouse[];

  uploadedFiles: any[] = []
  insertImg: NewImages
  addImage: FormGroup
  addImg: NewImages
  
  files:any
  getImg: any

  constructor(
    private newsService: NewsService,
    private messageService: MessageService, 
    private provinceService: ProvinceService,
    private cityService :CityService,
    private wardService:WardService,
    private categoryService:CategoryService,
    private cateHosueService:CateTOFhouseService,
    private formBuilder: FormBuilder,
    private newsTableService: NewsTableService,
    private checkService: Check,
    private confirmationService: ConfirmationService
  ) {  }

  ngOnInit(): void {
      this.username=localStorage.getItem("username");
      this.getcity=null;
      this.getward=null;

      this.provinceService.showall().then(
        trueresult =>{
          this.provincelist= trueresult as Province[];
          
        },
        erros=>{
          console.log(erros);
        }        
      );

      this.categoryService.showall().then(
        trueresult =>{
          this.catlist= trueresult as Category[];
          
        },
        erros=>{
          console.log(erros);
        }        
      );

      this.cateHosueService.showall().then(
        trueresult =>{
          this.catHouselist= trueresult as CateOfHouse[];
          
        },
        erros=>{
          console.log(erros);
        }        
      );

      this.addNews = this.formBuilder.group({
        title:'',
        provinceId: 0,
        newstypeid: null,
        citiId: 0,
        wardid: 0,
        price: null,
        categoryid: 0,
        cateTofhouseid: 0,
        acreage: 0,
        nobathroom: 0,
        nobedroom: 0,
        nolivroom: 0,
        garden: 0,
        bancony: 0,
        content: '',
        username: this.username,
        newstatus: null
    })

    this.addImage = this.formBuilder.group({
      newsid: this.newsid,
      photo: ''
  })
  }

  sortCities(){ 
    console.log(this.provinceId)
    if(this.provinceId == null){
      this.cityService.getCities(0).then(
        res => {
            this.citylist = res as City[]
            console.log(this.citylist)
        },
        err =>{
            console.log(err);
        }
      );
      this.wardService.getWards(0).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
    else{
      this.cityService.getCities(this.provinceId).then(
        res => {
            this.citylist = res as City[]
            console.log(this.citylist)
        },
        err =>{
            console.log(err);
        }
      );
      this.wardService.getWards(this.citiId).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    } 
  }

  sortWards(){
    if(this.citiId == null)
    {
      this.wardService.getWards(0).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
    else{
      console.log(this.provinceId)
      console.log(this.citiId)
      this.wardService.getWards(this.citiId).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
  }

  showCity(){
    this.cityService.getCities(this.getprovince.provinceId).then(
      trueresult =>{
        this.citylist= trueresult as City[];

      },
      erros=>{
        console.log(erros);
      }        
    );
  }

  showWard(){
    this.wardService.getWards(this.getcity.citiId).then(
      trueresult =>{
        this.wardlist= trueresult as Ward[];

      },
      erros=>{
        console.log(erros);
      }        
    );
  }

  selectFile(e: any){
    this.files = e.target.files
  }

  upload(){
    var news: NewsTable = this.addNews.value
    this.errorTitle = this.checkService.checkTitle(news.title)
    this.errorAddress = this.checkService.checkNull(news.wardid)
    this.errorStatus = this.checkService.checkNull(news.categoryid)
    this.errorCategory = this.checkService.checkNull(news.cateTofhouseid)
    this.errorPrice = this.checkService.checkNull(news.price)
    this.errorAcreage = this.checkService.checkNull(news.acreage)
    this.errorNoLiv = this.checkService.checkNull(news.nolivroom)
    this.errorNoBed = this.checkService.checkNull(news.nobedroom)
    this.errorNoBath = this.checkService.checkNull(news.nobathroom)
    this.errorGarden = this.checkService.checkNull(news.garden)
    this.errorBalcony = this.checkService.checkNull(news.bancony)
    this.errorContent = this.checkService.checkContent(news.content)

    if(this.errorTitle == "" && this.errorAddress == "" && this.errorStatus == "" && this.errorCategory =="" && this.errorPrice == "" &&
    this.errorAcreage == "" && this.errorNoLiv == "" && this.errorNoBed == "" && this.errorNoBath == "" && this.errorGarden == "" && this.errorBalcony == "" && this.errorContent == ""){
      var creatnews : NewsTable = this.addNews.value
      creatnews.title = creatnews.title.toUpperCase();
      console.log("newsform: " + creatnews.title)
      console.log("newsform: " + creatnews.price)
      console.log("newsform: " + creatnews.newstatus)
      console.log("newsform: " + creatnews.content)
      console.log("newsform: " + creatnews.categoryid)
      console.log("newsform: " + creatnews.newstypeid)
      this.newsTableService.createNews(creatnews).then(
        res =>{
            var resl: ResultAPI = res as ResultAPI;
            console.log("result: " + resl.result)
            if(resl.result){
                //this.messageService.add({severity:'success', summary: 'Success', detail: 'Insert news success!'});
                console.log('OK');
                this.newsTableService.getNewestNew(this.username).then(
                  res =>{
                    var getNews: NewsTable = res as NewsTable; 
                    this.newsid = getNews.newsid;
                    console.log(this.newsid) 
                   
                    this.newsTableService.getNewestNew(this.username).then(
                      res =>{
                        var getNews: NewsTable = res as NewsTable; 
                        this.newsid = getNews.newsid;
                        console.log(this.newsid) 

                        let formData = new FormData()
                        for(let file of this.files){
                          formData.append('files', file);
                        }
                          this.newsTableService.uploadImage(formData).then(
                            trueresult =>{         
                             this.getImg = trueresult as any
                             for(let img of this.getImg){
                              this.insertImg = this.addImage.value
                              this.insertImg.photo = img
                              this.insertImg.newsid = this.newsid
                              this.newsTableService.addImage(this.insertImg).then(
                                res =>{
                                    var resl: ResultAPI = res as ResultAPI;
                                    if(resl.result){
                                        console.log('OK');
                                    } else{
                                      this.messageService.add({severity: 'error', summary: 'Upload fail!', detail: ''});
                                      console.log('Fail');
                                    }
                               },
                               err =>{
                                    console.log(err);
                               });
                             }
                             
                            },
                            erros=>{
                              console.log(erros);
                            });

                          }, 
                      err =>{
                           console.log(err);
                      });                                     
                  },
                  err =>{
                       console.log(err);
                  });
            }else{
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Insert news fail!'});
                console.log('Fail');
            }
       },
       err =>{
            console.log(err);
       });
  }
     else{
       this.showError();
    }
      }


//   onUpload(event) {
//     var news: NewsTable = this.addNews.value
//     this.errorTitle = this.checkService.checkTitle(news.title)
//     this.errorAddress = this.checkService.checkNull(news.wardid)
//     this.errorStatus = this.checkService.checkNull(news.categoryid)
//     this.errorCategory = this.checkService.checkNull(news.cateTofhouseid)
//     this.errorPrice = this.checkService.checkNull(news.price)
//     this.errorAcreage = this.checkService.checkNull(news.acreage)
//     this.errorNoLiv = this.checkService.checkNull(news.nolivroom)
//     this.errorNoBed = this.checkService.checkNull(news.nobedroom)
//     this.errorNoBath = this.checkService.checkNull(news.nobathroom)
//     this.errorGarden = this.checkService.checkNull(news.garden)
//     this.errorBalcony = this.checkService.checkNull(news.bancony)
//     this.errorContent = this.checkService.checkContent(news.content)

//     if(this.errorTitle == "" && this.errorAddress == "" && this.errorStatus == "" && this.errorCategory =="" && this.errorPrice == "" &&
//     this.errorAcreage == "" && this.errorNoLiv == "" && this.errorNoBed == "" && this.errorNoBath == "" && this.errorGarden == "" && this.errorBalcony == "" && this.errorContent == ""){
//       var creatnews : NewsTable = this.addNews.value
//       creatnews.title = creatnews.title.toUpperCase();
//       console.log("newsform: " + creatnews.title)
//       console.log("newsform: " + creatnews.price)
//       console.log("newsform: " + creatnews.newstatus)
//       console.log("newsform: " + creatnews.content)
//       console.log("newsform: " + creatnews.categoryid)
//       console.log("newsform: " + creatnews.newstypeid)
//       this.newsTableService.createNews(creatnews).then(
//         res =>{
//             var resl: ResultAPI = res as ResultAPI;
//             console.log("result: " + resl.result)
//             if(resl.result){
//                 //this.messageService.add({severity:'success', summary: 'Success', detail: 'Insert news success!'});
//                 console.log('OK');
//                 this.newsTableService.getNewestNew(this.username).then(
//                   res =>{
//                     var getNews: NewsTable = res as NewsTable; 
//                     this.newsid = getNews.newsid;
//                     console.log(this.newsid) 
                   
//                     this.newsTableService.getNewestNew(this.username).then(
//                       res =>{
//                         var getNews: NewsTable = res as NewsTable; 
//                         this.newsid = getNews.newsid;
//                         console.log(this.newsid) 
//                         for(let file of event.files) {
//                           console.log(file) 
//                             this.uploadedFiles.push(file);
//                             console.log(file.name) 
//                             this.insertImg = this.addImage.value
//                             this.insertImg.photo = file.name
//                             this.insertImg.newsid = this.newsid
//                             console.log(this.insertImg.photo)
//                           this.newsTableService.addImage(this.insertImg).then(
//                           res =>{
//                               var resl: ResultAPI = res as ResultAPI;
//                               if(resl.result){
//                                   console.log('OK');
//                               } else{
//                                 this.messageService.add({severity: 'error', summary: 'Upload fail!', detail: ''});
//                                 console.log('Fail');
//                               }
//                          },
//                          err =>{
//                               console.log(err);
//                          });
//                         }
//                       },
//                       err =>{
//                            console.log(err);
//                       });                   
//                   },
//                   err =>{
//                        console.log(err);
//                   });
//             }else{
//                 this.messageService.add({severity:'error', summary: 'Error', detail: 'Insert news fail!'});
//                 console.log('Fail');
//             }
//        },
//        err =>{
//             console.log(err);
//        });
//   }
//      else{
//        this.showError();
//     }
    
// }

  save(){
    var news: NewsTable = this.addNews.value
    this.errorTitle = this.checkService.checkTitle(news.title)
    this.errorAddress = this.checkService.checkNull(news.wardid)
    this.errorStatus = this.checkService.checkNull(news.categoryid)
    this.errorCategory = this.checkService.checkNull(news.cateTofhouseid)
    this.errorPrice = this.checkService.checkNull(news.price)
    this.errorAcreage = this.checkService.checkNull(news.acreage)
    this.errorNoLiv = this.checkService.checkNull(news.nolivroom)
    this.errorNoBed = this.checkService.checkNull(news.nobedroom)
    this.errorNoBath = this.checkService.checkNull(news.nobathroom)
    this.errorGarden = this.checkService.checkNull(news.garden)
    this.errorBalcony = this.checkService.checkNull(news.bancony)
    this.errorContent = this.checkService.checkContent(news.content)

    if(this.errorTitle == "" && this.errorAddress == "" && this.errorStatus == "" && this.errorCategory =="" && this.errorPrice == "" &&
    this.errorAcreage == "" && this.errorNoLiv == "" && this.errorNoBed == "" && this.errorNoBath == "" && this.errorGarden == "" && this.errorBalcony == "" && this.errorContent == ""){
      var creatnews : NewsTable = this.addNews.value
      creatnews.title = creatnews.title.toUpperCase();
      console.log("newsform: " + creatnews.title)
      console.log("newsform: " + creatnews.price)
      console.log("newsform: " + creatnews.newstatus)
      console.log("newsform: " + creatnews.content)
      console.log("newsform: " + creatnews.categoryid)
      console.log("newsform: " + creatnews.newstypeid)
      this.newsTableService.createNews(creatnews).then(
        res =>{
            var resl: ResultAPI = res as ResultAPI;
            console.log("result: " + resl.result)
            if(resl.result){
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Insert news success!'});
                console.log('OK');
                this.newsTableService.getNewestNew(this.username).then(
                  res =>{
                    var getNews: NewsTable = res as NewsTable; 
                    this.newsid = getNews.newsid;
                    console.log(this.newsid) 
                    
                    this.newsService.getnewsimagesbyid(this.newsid).then(
                      trueresult =>{
            
                              this.addImg = trueresult as NewImages
                              console.log("top: " + this.addImg)
                      },
                      erros=>{
                        console.log(erros);
                    });
                  },
                  err =>{
                       console.log(err);
                  });
            }else{
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Insert news fail!'});
                console.log('Fail');
            }
       },
       err =>{
            console.log(err);
       });
  }
     else{
       this.showError();
    }
    
  }
  showError() {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Content invalid!'});
  }


  delete(id: number){
    console.log(id)
    this.confirmationService.confirm({
      message: 'Do you want to delete this image?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.newsTableService.deleteImage(id).then(
            res =>{
                var resl: ResultAPI = res as ResultAPI;
                if(resl.result){
                    this.messageService.add({severity:'success', summary:'Success', detail:'Image deleted'});
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
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
}
}
 