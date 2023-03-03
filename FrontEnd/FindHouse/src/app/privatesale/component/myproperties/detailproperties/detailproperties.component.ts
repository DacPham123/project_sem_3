import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { News } from 'src/app/models/news.model';
import { NewImages } from 'src/app/models/newsimages.model';
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
  templateUrl: './detailproperties.component.html',
})

export class DetailPropertiesComponent implements  OnInit {
   
  username: string
  editNewsForm: FormGroup
  selectNews: News
  provinceId: number
  citiId: number
  // wardid:number
  getnews: News
  errorTitle: string
  errorContent: string
  errorAddress1: string
  errorAddress2: string
  errorStatus: string
  errorCategory: string
  errorPrice: string
  errorAcreage: string
  errorNoBed: string
  errorNoBath: string
  errorNoLiv: string
  errorGarden: string
  errorBalcony: string

  catId: number
  catHouseId: number

  citylist:City[];
  getcity:City;

  provincelist:Province[];
  getprovince:Province;

  wardlist:Ward[];
  getward:Ward;

  catlist: Category[];
  catHouselist: CateOfHouse[];


  images: NewImages[];
  uploadedFiles: any[] = [];

    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService, 
    private newsService: NewsService,
    private provinceService: ProvinceService,
    private cityService :CityService,
    private wardService:WardService,
    private categoryService:CategoryService,
    private cateHosueService:CateTOFhouseService,
    private formBuilder: FormBuilder,
    private newsTableService: NewsTableService,
    private checkService: Check,
    private router: Router,
  ) {  
    
  }

  ngOnInit(): void {
    this.reload()
  }

  reload(){
    this.activatedRoute.paramMap.subscribe(param =>{
      var newsid = param.get('id');
      this.newsService.getnewbyidshowdetailspage(parseInt(newsid)).then(
        trueresult =>{
          this.selectNews= trueresult as News;
          console.log(this.selectNews)
          this.catId = this.selectNews.categoryid
          this.catHouseId = this.selectNews.cateTofhouseid
          this.editNewsForm = this.formBuilder.group({
            title: this.selectNews.title,
            price: this.selectNews.price,
            wardid: this.selectNews.wardid,
            categoryid: this.selectNews.categoryid,
            cateTofhouseid: this.selectNews.cateTofhouseid,
            acreage: this.selectNews.acreage,
            nobathroom: this.selectNews.nobathroom,
            nobedroom: this.selectNews.nobedroom,
            nolivroom: this.selectNews.nolivroom,
            garden: this.selectNews.garden,
            bancony: this.selectNews.bancony,
            content: this.selectNews.content,
            newsid: this.selectNews.newsid,
            createdate:this.selectNews.createdate,
            newstypeid: this.selectNews.newstypeid,
            adstimefrom: this.selectNews.adstimefrom,
            adstimeto: this.selectNews.adstimeto,
            username: this.selectNews.username,
            newstatus: this.selectNews.newstatus,
        })     
      },
        erros=>{
          console.log(erros);
        });

      });

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
  }

  sortCities(){ 
    console.log(this.provinceId)
    console.log(this.citiId)
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
    console.log(this.citiId)
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

  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  update(){
    
    if(this.provinceId != null || this.citiId != null){
      var selectNews: NewsTable = this.editNewsForm.value;
      this.errorTitle = this.checkService.checkTitle(selectNews.title)
      this.errorAddress1 = this.checkService.checkNull(selectNews.wardid)
      this.errorAddress2 = this.checkService.checkNull(this.citiId)
      this.errorStatus = this.checkService.checkNull(selectNews.categoryid)
      this.errorCategory = this.checkService.checkNull(selectNews.cateTofhouseid)
      this.errorPrice = this.checkService.checkNull(selectNews.price)
      this.errorAcreage = this.checkService.checkNull(selectNews.acreage)
      this.errorNoLiv = this.checkService.checkNull(selectNews.nolivroom)
      this.errorNoBed = this.checkService.checkNull(selectNews.nobedroom)
      this.errorNoBath = this.checkService.checkNull(selectNews.nobathroom)
      this.errorGarden = this.checkService.checkNull(selectNews.garden)
      this.errorBalcony = this.checkService.checkNull(selectNews.bancony)
      this.errorContent = this.checkService.checkContent(selectNews.content)
      console.log(this.provinceId)
      console.log(this.citiId)

      if(this.errorTitle == "" && this.errorAddress2 == "" && this.errorAddress1 == "" && this.errorStatus == "" && this.errorCategory =="" && this.errorPrice == "" &&
      this.errorAcreage == "" && this.errorNoLiv == "" && this.errorNoBed == "" && this.errorNoBath == "" && this.errorGarden == "" && this.errorBalcony == "" && this.errorContent == ""){
        selectNews.title = selectNews.title.toUpperCase();
        this.newsTableService.updateNews(selectNews).then(
          res =>{
              var resl: ResultAPI = res as ResultAPI;
              if(resl.result){
                console.log(selectNews)               
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                this.router.navigate(['/privatesale/myproperties/list'])
                console.log('OK');
              } else{
                  this.messageService.add({severity: 'error', summary: 'Update info fail!', detail: ''});
                  console.log('Fail');
              } 
         },
         err =>{
              console.log(err);
         });
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Content invalid!'});
      }
    }
    else if(this.provinceId == null && this.citiId == null) {
      var selectNews: NewsTable = this.editNewsForm.value;
      this.errorTitle = this.checkService.checkTitle(selectNews.title)
      this.errorStatus = this.checkService.checkNull(selectNews.categoryid)
      this.errorCategory = this.checkService.checkNull(selectNews.cateTofhouseid)
      this.errorPrice = this.checkService.checkNull(selectNews.price)
      this.errorAcreage = this.checkService.checkNull(selectNews.acreage)
      this.errorNoLiv = this.checkService.checkNull(selectNews.nolivroom)
      this.errorNoBed = this.checkService.checkNull(selectNews.nobedroom)
      this.errorNoBath = this.checkService.checkNull(selectNews.nobathroom)
      this.errorGarden = this.checkService.checkNull(selectNews.garden)
      this.errorBalcony = this.checkService.checkNull(selectNews.bancony)
      this.errorContent = this.checkService.checkContent(selectNews.content)
      console.log(this.provinceId)
      console.log(this.citiId)
      console.log(selectNews.wardid)
      
      if(this.errorTitle == ""  && this.errorStatus == "" && this.errorCategory =="" && this.errorPrice == "" &&
      this.errorAcreage == "" && this.errorNoLiv == "" && this.errorNoBed == "" && this.errorNoBath == "" && this.errorGarden == "" && this.errorBalcony == "" && this.errorContent == ""){
         selectNews.title = selectNews.title.toUpperCase();
        
        this.newsService.getnewbyidshowdetailspage(selectNews.newsid).then(
          trueresult =>{
            this.getnews = trueresult as News;
            selectNews.wardid = this.getnews.wardid
            console.log("wardid1: " + selectNews.wardid)
            this.newsTableService.updateNews(selectNews).then(
              res =>{
                  var resl: ResultAPI = res as ResultAPI;
                  if(resl.result){
                    console.log(selectNews)               
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update info success!'});
                    this.router.navigate(['/privatesale/myproperties/list'])
                    console.log('OK');
                  } else{
                      this.messageService.add({severity: 'error', summary: 'Update info fail!', detail: ''});
                      console.log('Fail');
                  } 
             },
             err =>{
                  console.log(err);
             });
          },
          err =>{
            console.log(err);
        },)
        
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Content invalid!'});
      }
    }     
  }
}
 