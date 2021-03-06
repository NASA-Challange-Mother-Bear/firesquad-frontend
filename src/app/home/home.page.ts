import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { UserService } from '../services/user.service';
import { ReportService } from '../services/report.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };
  @ViewChild('content') contentRef: ElementRef;
  private picture: string;

  constructor(public platform: Platform,
              public cameraPreview: CameraPreview,
              public geolocation: Geolocation,
              public userService: UserService,
              public router: Router,
              public reportService: ReportService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      const bb = (this.contentRef.nativeElement as HTMLElement).getBoundingClientRect();
      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: window.screen.height - bb.height,
        width: bb.width,
        height: bb.height,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: false,
        toBack: true,
        alpha: 1
      };
      console.log(cameraPreviewOpts);
      this.platform.ready().then(() => {

        this.cameraPreview.startCamera(cameraPreviewOpts).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          });
      });
    }, 0);
  }

  takePhoto() {
    if (!this.picture) {
      const pictureOpts: CameraPreviewPictureOptions = {
        width: 1280,
        height: 1280,
        quality: 85
      };

      this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
        this.picture = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
        this.picture = 'assets/img/test.jpg';
      });
    } else {
      this.picture = null;
    }
  }

  onClick(type) {
    this.reportService.postReport(type, [0, 0], this.picture);
    this.picture = null;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

}
