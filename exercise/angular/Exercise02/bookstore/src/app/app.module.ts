import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { BookDetailsComponent } from './catalog/book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    BookDetailsComponent,
    HomeComponent,
    CustomerDetailsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
