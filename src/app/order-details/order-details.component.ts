import { Component, OnInit } from '@angular/core';
import { ItemDetail } from './../ItemDetail';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less']
})

export class OrderDetailsComponent implements OnInit {

  itemList : any;
  results : any;
  totalAmount : any;
  orderDate:any;
  constructor(private route: ActivatedRoute,
              private http : HttpClient ) { }

  ngOnInit() {
    this.totalAmount = this.route.queryParamMap.subscribe( params => {
      this.totalAmount = params['params'].totalAmount;
    });
    
    this.itemList = this.route.queryParamMap.subscribe(params => {
      this.results = JSON.parse(params['params'].obj);
      this.totalAmount = JSON.parse(params['params'].totalAmount);
      this.orderDate = JSON.stringify(params['params'].orderTime);
      
      //this.results = this.results.filter(
      //item => item.selectedQuantity >= 1);
    })
    }
}
