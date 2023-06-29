import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainComponent } from './components/main/main.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { ProfileViewComponent } from './components/profile-view/profile-view.component'
import { UpdatePoseComponent } from './components/update-pose/update-pose.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'poses', component: ProfileViewComponent, canActivate: [AuthGuardService] },
  { path: 'poses/:id', component: UpdatePoseComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
