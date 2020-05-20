import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.css']
})
export class WelcomComponent implements OnInit {

  public buttonDisable:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  
  checkDocConfirm(event){
    let checkboxStatus = event.target.checked;
  
    if(checkboxStatus == true)
      this.buttonDisable = false;
    else
      this.buttonDisable = true;

    console.log(this.buttonDisable);


  }

}
