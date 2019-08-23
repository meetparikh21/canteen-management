import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule,MatCheckboxModule, MatTabsModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemsDetailService } from './items-detail.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserItemListComponent } from './user-item-list/user-item-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from 'src/environments/environment';
import {ShoppingCartModule, CartService} from 'ng-shopping-cart';
import { CustomCartItemComponent } from './custom-cart-item/custom-cart-item.component';
import { UserCartItemComponent } from './user-cart-item/user-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    OrderDetailsComponent,
    UserItemListComponent,
    NavbarComponent,
    CustomCartItemComponent,
    UserCartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    LoginService,
    ItemsDetailService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
