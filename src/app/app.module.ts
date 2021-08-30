import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlayerActionsComponent } from './player-actions/player-actions.component';
import { PlaylistRemoveDialogComponent } from './playlist/playlist-remove-dialog/playlist-remove-dialog.component';
import { environment } from '../environments/environment';
import { PlaylistAddDialogComponent } from './playlist/playlist-add-dialog/playlist-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SearchComponent,
    AccountComponent,
    PlaylistComponent,
    PlayerActionsComponent,
    PlaylistRemoveDialogComponent,
    PlaylistAddDialogComponent,
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
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
