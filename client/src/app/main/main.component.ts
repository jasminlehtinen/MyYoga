import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Navigates the user to the login page
  toLogin() {
    this.router.navigate(['/login'])
  }

  // Navigates the user to the register page
  toRegister() {
    this.router.navigate(['/signup'])
  }
}
