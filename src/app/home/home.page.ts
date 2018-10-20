import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions} from '@ionic-native/camera-preview/ngx';
import { UserService } from '../services/user.service';


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
    private picture: string;

    constructor(private cameraPreview: CameraPreview,
                public userService: UserService) {
        // if (this.userService.awaitUser || this.userService.user) {
        //
        // } else {
        //     this.userService.login('roadd', 'garfield98').subscribe(() => {});
        // }
    }

    ngOnInit(): void {
        const cameraPreviewOpts: CameraPreviewOptions = {
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
        console.log(cameraPreviewOpts);
        this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
                console.log(res);
            },
            (err) => {
                console.log(err);
            });


    }

    onClick() {
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
    }

}
