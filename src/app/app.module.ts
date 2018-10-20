import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Camera} from '@ionic-native/camera/ngx';
import {CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions} from '@ionic-native/camera-preview/ngx';

import { UserService } from './services/user.service';
import { RequestUtilsService } from './services/request-utils.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
    declarations: [AppComponent, AuthComponent, LoginComponent, RegisterComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera, CameraPreview,
        UserService,
        RequestUtilsService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
