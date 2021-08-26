import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { DisplayPosesComponent } from './display-poses/display-poses.component'
import { UpdatePoseComponent } from './update-pose/update-pose.component'
import { AuthGuardService } from './_services/auth-guard.service'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'poses', component: DisplayPosesComponent, canActivate: [AuthGuardService] },
  { path: 'poses/:id', component: UpdatePoseComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
