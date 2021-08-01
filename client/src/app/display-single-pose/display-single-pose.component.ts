import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { PosesService } from '../_services/poses.service'
import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-display-single-pose',
  templateUrl: './display-single-pose.component.html',
  styleUrls: ['./display-single-pose.component.css']
})
export class DisplaySinglePoseComponent implements OnInit {
  user: any
  public poses = []

  constructor(private route: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService, private _poseService: PosesService) { }

  ngOnInit() {
    this.user = this.tokenStorage.getUser()

    let id = this.route.snapshot.paramMap.get('id')

    this._poseService.getPoseById(id)
      .subscribe(data => this.poses = data)
  }

  toDisplayPoses() {
    this.router.navigate(['/poses'])
  }

}
