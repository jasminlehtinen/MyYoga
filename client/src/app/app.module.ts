import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { MainComponent } from './components/main/main.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DisplayPosesComponent } from './components/display-poses/display-poses.component'
import { FormControlComponent } from './components/form-control/form-control.component'
import { UpdatePoseComponent } from './components/update-pose/update-pose.component'
import { ProfileViewComponent } from './components/profile-view/profile-view.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

import { PosesService } from './services/poses.service'
import { ValidateEmailDirective } from './directives/validate-email.directive'

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
    ValidateEmailDirective,
    NotFoundComponent
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
