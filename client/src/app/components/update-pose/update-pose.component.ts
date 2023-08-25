import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { PosesService } from '../../services/poses.service'
import { TokenStorageService } from '../../services/token-storage.service'

@Component({
  selector: 'app-update-pose',
  templateUrl: './update-pose.component.html',
  styleUrls: ['./update-pose.component.css']
})
export class UpdatePoseComponent implements OnInit, OnDestroy {

  public poses = [] // Empty array where fetched poses data is assigned to
  user: any // Assign the retrieved user data
  isUpdate = true // Determines that the Form-Control component should display "Update" form
  displayedColumns = ['englishName', 'sanskritName', 'type', 'level', 'link', 'back'] // Columns displayed on the page

  // Subscription to the getPoseById method in the PosesService
  private getPoseIdSub: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private poseService: PosesService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.user = this.tokenStorage.getUser() // Retrieves the user data by calling the getUser method in the TokenStorage
    let id = this.route.snapshot.paramMap.get('id') // Get the ID of the pose the user is updating

    // Subscribes to the getPoseById method in the PosesService to get a specific pose based on its ID
    this.getPoseIdSub = this.poseService.getPoseById(id)
      .subscribe(
        data => { 
          this.poses = data
        },
        error => {
          console.error('Error fetching pose:', error)
        }
      )
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription
    if (this.getPoseIdSub) {
      this.getPoseIdSub.unsubscribe()
    }
  }

  // Router navigates back to the main page, where all poses are displayed
  toDisplayPoses() {
    this.router.navigate(['/poses'])
  }
}
