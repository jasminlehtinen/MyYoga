import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { DisplayPosesComponent } from './display-poses/display-poses.component'

import { AppRoutingModule } from './app-routing.module';
import { PosesService } from './_services/poses.service';
import { EnvServiceProvider } from './_services/env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DisplayPosesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PosesService, EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
