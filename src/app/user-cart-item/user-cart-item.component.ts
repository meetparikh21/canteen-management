import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-user-cart-item',
  templateUrl: './user-cart-item.component.html',
  styleUrls: ['./user-cart-item.component.less']
})

export class UserCartItemComponent {

  public itemId: number;
  public itemName: string;
  public quantity: number;
  public unitPrice: number;

  
}
