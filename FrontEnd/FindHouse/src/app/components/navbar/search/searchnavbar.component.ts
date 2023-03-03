import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'searchnavbar',
  templateUrl: './././searchnavbar.component.html'
})
export class SearchNavbarComponent implements OnInit {

  searchform:FormGroup;
  keyword:string;
  constructor(
    private formBuider:FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchform=this.formBuider.group({
      key:''
    });
  }
  sendkeyword(){   
    this.keyword=this.searchform.value.key;
  }
}
