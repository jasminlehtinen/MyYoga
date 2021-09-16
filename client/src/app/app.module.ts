import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { DisplayPosesComponent } from './display-poses/display-poses.component'
import { FormControlComponent } from './form-control/form-control.component'
import { UpdatePoseComponent } from './update-pose/update-pose.component'

import { AppRoutingModule } from './app-routing.module'
import { PosesService } from './_services/poses.service'
import { EnvServiceProvider } from './_services/env.service.provider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    DisplayPosesComponent,
    FormControlComponent,
    UpdatePoseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [PosesService, EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
