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
import { StateManga } from './store/manga/manga.state';
import { StateName } from './store/name/name.state';
import { IonicStorageModule } from "@ionic/storage-angular";
import { ComponentsModule } from './components/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    NgxsModule.forRoot([TokenState, StateAvatar, StateEmail, StateManga, StateName]),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
