import { Component, OnInit } from '@angular/core';
import { PosesService } from '../_services/poses.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-display-poses',
  templateUrl: './display-poses.component.html',
  styleUrls: ['./display-poses.component.css']
})
export class DisplayPosesComponent implements OnInit {

  user: any
  public poses = []

  constructor(private tokenStorage: TokenStorageService, private _poseService: PosesService) {}

  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    this._poseService.getPoses()
      .subscribe(data => this.poses = data)
  }
}
