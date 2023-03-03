import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { NewTypes } from 'src/app/models/newtype.model';
import { NewstypeService } from 'src/app/services/newstype.service';


@Component({

  selector:'newstypebanner',
  templateUrl: 'newstypebanner.component.html'
})
export class NewTypesBannerComponent implements OnInit {
  newstype:NewTypes;
  newstypeid:number;

  
  constructor(
    private newstypeService : NewstypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe( (params) => {
      var id=params['newstypeid']; 
      this.newstypeid=id;

      this.newstypeService.getcateofhouse(id).then(trueresult =>{
              this.newstype=trueresult as NewTypes; 

            }, erros=>{
              console.log(erros);
            }
                  
          );

    });
  }

}
