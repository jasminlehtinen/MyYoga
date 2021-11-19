import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PosesService } from '../_services/poses.service'

@Component({
  selector: 'app-display-poses',
  templateUrl: './display-poses.component.html',
  styleUrls: ['./display-poses.component.css']
})
export class DisplayPosesComponent implements OnInit {

  public poses = []
  displayedColumns = ['englishName', 'sanskritName', 'type', 'difficulty', 'link', 'delete', 'update']

  constructor(private router: Router, private _poseService: PosesService) {}

  ngOnInit() {
    /* Display all poses added by an user */
    this._poseService.getPoses()
      .subscribe(data => this.poses = data)
  }

  reloadPage(): void {
    window.location.reload()
  }

  /* Delete a pose from the page */
  deletePose(pose) {
    let id = pose.id

    this._poseService.deletePose(id)
      .subscribe(data => {
        this.poses != data
        this.reloadPage()
      })
  }

  /* Update an existing pose */
  updatePose(pose) {
    let id = pose.id

    this.router.navigate(['/poses' + '/' + id])
  }
}
