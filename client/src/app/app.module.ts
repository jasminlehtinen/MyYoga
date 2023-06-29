import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { DisplayPosesComponent } from './display-poses/display-poses.component'
import { FormControlComponent } from './form-control/form-control.component'
import { UpdatePoseComponent } from './update-pose/update-pose.component'
import { ProfileViewComponent } from './profile-view/profile-view.component'

import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PosesService } from './services/poses.service'
import { ValidateEmailDirective } from './validate-email.directive'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    DisplayPosesComponent,
    FormControlComponent,
    UpdatePoseComponent,
    ProfileViewComponent,
    ValidateEmailDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [PosesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
