import { Component, OnInit } from '@angular/core';
import { MangopayKyc } from '../mangopay-kyc';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    public kyc:MangopayKyc
  ) { }

  ngOnInit(): void {
    
    

  }

  createDoc(type,event){
    this.kyc.createDocument(type,event);
  }



}
