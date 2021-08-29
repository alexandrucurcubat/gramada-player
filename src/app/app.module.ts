import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistActionsComponent } from './playlist/playlist-actions/playlist-actions.component';
import { PlaylistDialogComponent } from './playlist/playlist-remove-dialog/playlist-remove-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SearchComponent,
    AccountComponent,
    PlaylistComponent,
    PlaylistActionsComponent,
    PlaylistDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
