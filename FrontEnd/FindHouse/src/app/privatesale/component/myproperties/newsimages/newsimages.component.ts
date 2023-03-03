import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from 'primeng/api';
import { NewImages } from 'src/app/models/newsimagesl.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';

@Component({
  templateUrl: './newsimages.component.html',
})

export class NewsImagesComponent implements OnInit {
   
  listimg: NewImages[];

  first = 0;

  rows = 10;

  newsid: string
  addImg: NewImages
  addImgage: FormGroup
  images: NewImages[];
  uploadedFiles: any[] = []
  insertImg: NewImages

  files:any
  getImg: any

  constructor(
    private newsService: NewsService,
    private newstableService: NewsTableService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {  
   
  }

  ngOnInit(): void {
    this.reload()
    this.addImgage = this.formBuilder.group({
      newsid: this.newsid,
      photo: ''
  })
  }  

  reload(){
    this.activatedRoute.paramMap.subscribe(param =>{
      this.newsid = param.get('id');
      this.newsService.getnewsimagesbyid(parseInt(this.newsid)).then(
        trueresult =>{
              this.listimg = trueresult as NewImages[]
              var listfile = trueresult as File[]
              console.log(this.listimg)
              console.log(listfile)
        })     
      },
        erros=>{
          console.log(erros);
      });

      this.activatedRoute.paramMap.subscribe(param =>{
        this.newsid = param.get('id');
        this.newsService.getnewsimagesbyid(parseInt(this.newsid)).then(
          trueresult =>{

                  this.addImg = trueresult as NewImages
                  console.log("top: " + this.addImg)
          })     
        },
          erros=>{
            console.log(erros);
        });
  }

  selectFile(e: any){
    this.files = e.target.files
  }
  
  upload() {
    // for(let file of event.files) {
    //   console.log(file) 
    //     this.uploadedFiles.push(file);
    //     console.log(file.name) 
    //     this.insertImg = this.addImgage.value
    //     this.insertImg.photo = file.name
    //     console.log(this.insertImg.photo)
    //   this.newstableService.addImage(this.insertImg).then(
    //   res =>{
    //       var resl: ResultAPI = res as ResultAPI;
    //       if(resl.result){
    //           this.reload();
    //           console.log('OK');
    //       } else{
    //         this.messageService.add({severity: 'error', summary: 'Upload fail!', detail: ''});
    //         console.log('Fail');
    //       }
    //  },
    //  err =>{
    //       console.log(err);
    //  });
    //}

    let formData = new FormData()
    for(let file of this.files){
      formData.append('files', file);
    }
      this.newstableService.uploadImage(formData).then(
        trueresult =>{         
         this.getImg = trueresult as any
         for(let img of this.getImg){
          this.insertImg = this.addImgage.value
          this.insertImg.photo = img          
          this.newstableService.addImage(this.insertImg).then(
            res =>{
                var resl: ResultAPI = res as ResultAPI;
                if(resl.result){
                    this.reload();
                    console.log('OK');
                    this.files = ''
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
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    this.messageService.add({severity: 'success', summary: 'Insert images success!', detail: ''});
  }


  delete(id: number){
      console.log(id)
      this.confirmationService.confirm({
        message: 'Do you want to delete this image?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.newstableService.deleteImage(id).then(
              res =>{
                  var resl: ResultAPI = res as ResultAPI;
                  if(resl.result){
                      this.reload();
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

 next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listimg ? this.first === (this.listimg.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listimg ? this.first === 0 : true;
}

}
 