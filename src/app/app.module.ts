import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlayerActionsComponent } from './player/player-actions/player-actions.component';
import { PlaylistRemoveDialogComponent } from './playlist/playlist-remove-dialog/playlist-remove-dialog.component';
import { environment } from '../environments/environment';
import { PlaylistAddDialogComponent } from './playlist/playlist-add-dialog/playlist-add-dialog.component';
import { NewUserDialogComponent } from './user/new-user-dialog/new-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SearchComponent,
    SettingsComponent,
    PlaylistComponent,
    PlayerActionsComponent,
    PlaylistRemoveDialogComponent,
    PlaylistAddDialogComponent,
    NewUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
