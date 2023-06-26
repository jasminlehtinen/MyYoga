import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { PosesService } from '../_services/poses.service'

@Component({
  selector: 'app-display-poses',
  templateUrl: './display-poses.component.html',
  styleUrls: ['./display-poses.component.css']
})
export class DisplayPosesComponent implements OnInit, OnDestroy {

  public poses = [] 
  displayedColumns = ['englishName', 'sanskritName', 'type', 'difficulty', 'link', 'buttons'] // Columns displayed on the page

  // Subscriptions to getPoses and deletePose API calls
  private getPosesSub: Subscription
  private deletePoseSub: Subscription

  constructor(private router: Router, private poseService: PosesService) {}

  ngOnInit() {
    // Subscribes to the getPoses method in the PosesService to get and display all the poses added by the user
    this.getPosesSub = this.poseService.getPoses()
      .subscribe(data => this.poses = data)
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions
    if (this.getPosesSub) {
      this.getPosesSub.unsubscribe()
    }
    if (this.deletePoseSub) {
      this.deletePoseSub.unsubscribe()
    }
  }

  // Reloads the page when a pose is deleted
  reloadPage(): void {
    window.location.reload()
  }

  // Subscribes to the deletePose method in the PosesService to delete a pose from the page
  deletePose(pose) {
    let id = pose.id 

    // Confirm that the user wants to delete the pose
    if (confirm('Are you sure you want to delete this pose?')) {
      this.deletePoseSub = this.poseService.deletePose(id)
      .subscribe(data => {
        this.poses != data
        this.reloadPage()
      })
    }
  }

  // Router navigates to a new page where the user can update the pose
  updatePose(pose) {
    let id = pose.id

    this.router.navigate(['/poses' + '/' + id])
  }
}
