import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BaseService } from './services/base.service';
import { JwtService } from './services/jwt.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuctionListComponent } from './pages/auction/auction-list/auction-list.component';
import { AuctionFormComponent } from './pages/auction/auction-form/auction-form.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuctionHasEnded } from "@app/pipes/auction.pipes";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuctionListComponent,
    AuctionFormComponent,
    LayoutComponent,
    AuctionHasEnded,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BaseService,
    JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
