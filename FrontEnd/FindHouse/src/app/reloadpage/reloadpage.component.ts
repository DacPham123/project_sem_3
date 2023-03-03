import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './reloadpage.component.html',
})
export class ReLoadPageComponent implements OnInit {
  
  checkRole:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
    
  

  ngOnInit(): void {
    this.checkRole = localStorage.getItem("role");
     if(this.checkRole == 'superadmin'){
      this.router.navigate(['/superadmin/'])
     }
     if(this.checkRole == 'admin'){
      this.router.navigate(['/admin/myaccount'])
    }
    if(this.checkRole == 'privateseller'){
      this.router.navigate(['/privatesale/profile'])
    }
    if(this.checkRole == 'agent'){
      this.router.navigate(['/agent/profile'])
    }
    if(this.checkRole == 'visitor'){
      this.router.navigate(['/visitor/profile'])
    }
    
  }


}
 