import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { PosesService } from '../../services/poses.service'
import { TokenStorageService } from '../../services/token-storage.service'

@Component({
  selector: 'app-update-pose',
  templateUrl: './update-pose.component.html',
  styleUrls: ['./update-pose.component.css']
})
export class UpdatePoseComponent implements OnInit {

  public poses = []
  user: any
  isUpdate = true
  displayedColumns = ['englishName', 'sanskritName', 'type', 'difficulty', 'link', 'back']

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
