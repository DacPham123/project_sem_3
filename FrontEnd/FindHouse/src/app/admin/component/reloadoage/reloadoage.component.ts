import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './reloadoage.component.html',
})
export class ReLoadPageComponent implements OnInit {
  
  newsid:number
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
    
  

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.newsid=params['newsid'];  
      if(this.newsid !=0){
        this.router.navigate(['/admin/shownewsdeatils/',{newsid: this.newsid}]);
      }
      else{
        this.router.navigate(['/admin/listagent']);
      }
  })

}
}
 