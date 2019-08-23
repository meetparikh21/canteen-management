import { Component, OnInit , ViewChild} from '@angular/core';
import { ItemsDetailService } from './../items-detail.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl , FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  itemName: string;
  category: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  
  public items = [];
  dataSource : any;
  totalOrderPrice : number;
  displayedColumns: string[] = ['category', 'itemName', 'price', 'remainingQuantity', 'selectedQuantity', 'totalPrice'];
  constructor(private itemsDetailService : ItemsDetailService,
              private router : Router,
              private route: ActivatedRoute 
              ) { }
  selection = new SelectionModel<PeriodicElement>(true, []);
  returnUrl: string;

  checkboxFormControl = new FormControl(true);
  myForm = new FormGroup({
    checked: new FormControl(true)
  })

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
    
    ngOnInit() {
      this.itemsDetailService.getItemDetails()
      .subscribe(Item => {
        this.items = Item;
        Item['itemQuantity'] = 0;
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.itemQuantity = 0;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log("jjjj",JSON.stringify(Item));
      })
 
    }
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    //console.log(JSON.stringify(this.dataSource));
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log("-this selection-",this.selection);
    console.log("---",numRows,"--",numSelected);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.itemName }`;
  }
  
  onIncrement(element){
    element.selectedQuantity += 1;
    element.totalPrice = element.selectedQuantity * parseInt(element.price);
    element.remainingQuantity -=1;
  }

  onDecrement(element){
    element.selectedQuantity -= 1;
    element.totalPrice = element.selectedQuantity * parseInt(element.price);
    element.remainingQuantity +=1;
  }

  // keyUp(element){
    
  //   element.totalPrice = this.totalPriceUpdate(element);  
  //   element.remainingQuantity = this.remainingQuanUpdate(element);
  //     //return value * element.price;
  // }

  // totalPriceUpdate(element){
  //   //console.log("item quan",value,'-',element);
  //   return element.totalPrice = element.selectedQuantity * parseInt(element.price);
  // }

  // remainingQuanUpdate(element){
  //   return element.remainingQuantity - element.selectedQuantity;
  // }

  getTotalCost(){
    return this.items.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  placeOrder(){
    this.totalOrderPrice = this.getTotalCost();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app-order-details';
    this.items.push(this.totalOrderPrice);
    console.log(this.items);
    this.router.navigate([this.returnUrl], {queryParams:{obj : JSON.stringify(this.items), totalAmount : JSON.stringify(this.totalOrderPrice)}});
  }
}
