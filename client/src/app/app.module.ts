import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { DisplayPosesComponent } from './display-poses/display-poses.component'

import { AppRoutingModule } from './app-routing.module';
import { PosesService } from './_services/poses.service';
import { EnvServiceProvider } from './_services/env.service.provider';
import { AddPoseComponent } from './add-pose/add-pose.component';
import { DisplaySinglePoseComponent } from './display-single-pose/display-single-pose.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    DisplayPosesComponent,
    AddPoseComponent,
    DisplaySinglePoseComponent
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
