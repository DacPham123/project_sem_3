import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  templateUrl: './package.component.html',
})
export class PackageComponent implements OnInit {
  
  packages : Package[];
  selectedPackage: Package[];
  constructor( private packageSer: PackageService) {

  }

  ngOnInit(): void {
    this.packageSer.findAll().then(
      res=>{
        this.packages = res as Package[];     
        console.log(this.packages.length);  
      }
    )
  }

  
}
 