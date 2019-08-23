import { Component, OnInit } from '@angular/core';
import { ItemsDetailService } from './../items-detail.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.less']
})
export class UserItemListComponent implements OnInit {

  selectedTab : string;
  results:any;
  items:any;
  cartItem : Array<Object> = [];
  cartTotalPrice:number = 0;
  returnUrl: string;

  constructor(private itemsDetailService : ItemsDetailService,
              private router : Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    // this.itemsDetailService.getItemDetails()
    //   .subscribe(Item => {
    //     this.items = Item;
    //     this.results = this.items;
    //   })

    this.itemsDetailService.getItemList()
      .subscribe(res => {
        this.items = [];
        //this.results = [];
        res.forEach(a => {
          let item:any = a.payload.doc.data();
          this.items.push(item);
        })
        this.results = this.items;
        console.log("item result list",this.results);
      })
  }

  filter($event){
    this.selectedTab = $event.tab.textLabel;
    console.log("selected tab",this.selectedTab);
    this.results = this.items.filter(item => 
      item.category == (this.selectedTab).toLowerCase()
    );
    // in case of not matched category like ALL...
    if(!this.results.length){ 
      this.results = this.items;
    }
  }

  onIncrement(item){
    item.selectedQuantity +=1;
    item.totalPrice = item.selectedQuantity * parseInt(item.unitPrice);
    this.cartItemList(); 
  }

  onDecrement(item){
    item.selectedQuantity -=1;
    item.totalPrice = item.selectedQuantity * parseInt(item.unitPrice);
    this.cartItemList();
  }

  addToCart(item) {
    console.log("totadd to cart--",this.cartItem);

    this.cartItem.forEach(cartitem => {

      if(cartitem['itemId'] == item.itemId){
        console.log("samemeee---");
        //this.onIncrement(item);
      }
      else{
        //this.cartItem.push(item);
      }
    })
    this.onIncrement(item);
    this.cartItem.push(item);
    this.cartItemList(); 
  }
  
  cartItemList(){
    this.cartTotal();
  }

  cartTotal(){
    this.cartTotalPrice = 0;
    this.cartItem.forEach(item => {
      return this.cartTotalPrice += parseInt(item['totalPrice']);
    })
  }

  removeCartItem(removedItem){
    this.cartItem = this.cartItem.filter(item => item !== removedItem);
    this.cartTotal();
  }

  placeOrder(){
    console.log("item added-00--",this.cartItem);
    console.log("item totalPrice--",this.cartTotalPrice);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app-order-details';
    this.router.navigate([this.returnUrl], {queryParams:{obj : JSON.stringify(this.cartItem), totalAmount : JSON.stringify(this.cartTotalPrice), orderTime : new Date}});
    // this.totalOrderPrice = this.getTotalCost();
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app-order-details';
    // this.items.push(this.totalOrderPrice);
    // console.log(this.items);
    // this.router.navigate([this.returnUrl], {queryParams:{obj : JSON.stringify(this.items), totalAmount : JSON.stringify(this.totalOrderPrice)}});
  }

}
