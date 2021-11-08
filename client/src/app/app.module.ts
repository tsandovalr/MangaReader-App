import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from "@ngxs/store";
import { TokenState } from "./store/token/token.state";
import { StateAvatar } from "./store/avatar/avatar.state";
import { StateEmail } from "./store/email/email.state";
import { IonicStorageModule } from "@ionic/storage-angular";
import { ComponentsModule } from './components/components.module';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    NgxsModule.forRoot([TokenState, StateAvatar, StateEmail]),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
