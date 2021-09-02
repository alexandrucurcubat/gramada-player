import { Injectable, OnDestroy } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  onSnapshot,
  doc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  updateDoc,
  limit,
  writeBatch,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { orderBy } from '@firebase/firestore';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';

import { User } from '../models/user.interface';
import { Video } from '../models/video.interface';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class PlaylistService implements OnDestroy {
  private playlistSubject = new BehaviorSubject<Video[]>([]);
  private playingVideoSubject = new BehaviorSubject<Video | null>(null);
  readonly playlist$ = this.playlistSubject.asObservable();
  readonly playingVideo$ = this.playingVideoSubject.asObservable();
  private playlist: Video[] = [];
  private playingVideo: Video | null;
  private subscription = new Subscription();
  private playlistUnsubscribe: Unsubscribe;
  private playingUnsubscribe: Unsubscribe;

  currentUser: User | null;

  constructor(
    private db: Firestore,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    const playlistRef = query(
      collection(this.db, 'playlist'),
      orderBy('isPlaying', 'desc'),
      orderBy('boost', 'desc'),
      orderBy('addedTimestamp')
    );
    this.playlistUnsubscribe = onSnapshot(playlistRef, (playlistSnapshot) => {
      const playlist: Video[] = [];
      playlistSnapshot.forEach((doc) => {
        playlist.push(doc.data() as Video);
      });
      this.playlistSubject.next(playlist);
      this.playlist = playlist;
    });
    this.subscription.add(
      userService.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  async initPlaylist() {
    try {
      const playingRef = query(collection(this.db, 'playing'), limit(1));
      this.playingUnsubscribe = onSnapshot(
        playingRef,
        async (playingSnapshot) => {
          if (playingSnapshot.empty && this.playlist.length > 0) {
            this.playingVideo = this.playlist[0];
            const batch = writeBatch(this.db);
            batch.set(
              doc(this.db, 'playing', this.playingVideo.videoId),
              this.playingVideo
            );
            batch.delete(doc(this.db, 'playlist', this.playingVideo.videoId));
            batch.commit();
            this.playingVideoSubject.next(this.playingVideo);
            if (
              this.currentUser &&
              this.playingVideo.boostedBy?.includes(this.currentUser.username)
            ) {
              await this.userService.updateCanBoost(this.currentUser);
            }
          } else if (playingSnapshot.empty && this.playlist.length === 0) {
            this.playingVideoSubject.next(null);
          } else if (!playingSnapshot.empty) {
            playingSnapshot.forEach((doc) => {
              this.playingVideo = doc.data() as Video;
              this.playingVideoSubject.next(this.playingVideo);
            });
          }
        }
      );
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async add(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await setDoc(docRef, {
        ...video,
        isPlaying: false,
        boost: 0,
        boostedBy: [],
        addedTimestamp: serverTimestamp(),
      });
      this.snackBar.open('Video added to playlist', 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async skip() {
    try {
      if (this.playingVideo) {
        const batch = writeBatch(this.db);
        batch.set(doc(this.db, 'playlist', this.playingVideo.videoId), {
          ...this.playingVideo,
          isPlaying: false,
          boost: 0,
          boostedBy: [],
          addedTimestamp: serverTimestamp(),
        });
        batch.delete(doc(this.db, 'playing', this.playingVideo.videoId));
        await batch.commit();
        if (
          this.currentUser &&
          this.playingVideo.boostedBy?.includes(this.currentUser.username)
        ) {
          await this.userService.updateCanBoost(this.currentUser);
        }
      }
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async remove(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await deleteDoc(docRef);
      this.snackBar.open('Video removed from playlist', 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async updateTimestamp(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await updateDoc(docRef, {
        addedTimestamp: serverTimestamp(),
      });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async resetBoost(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      await updateDoc(docRef, {
        boost: 0,
      });
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  async boost(video: Video) {
    try {
      const docRef = doc(this.db, 'playlist', video.videoId);
      if (
        this.currentUser &&
        video.boost !== undefined &&
        video.boostedBy !== undefined &&
        video.boostedBy.includes(this.currentUser.username)
      ) {
        await updateDoc(docRef, {
          boost: video.boost - 1,
          boostedBy: video.boostedBy.filter(
            (username) => username !== this.currentUser?.username
          ),
        });
        await this.userService.updateCanBoost(this.currentUser);
        this.snackBar.open('Boost canceled', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
        });
      } else if (
        this.currentUser &&
        video.boost !== undefined &&
        video.boostedBy !== undefined &&
        !video.boostedBy.includes(this.currentUser.username) &&
        this.currentUser.canBoost
      ) {
        await updateDoc(docRef, {
          boost: video.boost + 1,
          boostedBy: [...video.boostedBy, this.currentUser.username],
        });
        await this.userService.updateCanBoost(this.currentUser);
        this.snackBar.open('Video boosted', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
        });
      } else {
        this.snackBar.open('Boost already used', 'OK', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    } catch (error) {
      this.snackBar.open(error.message, 'OK', {
        duration: 5000,
        verticalPosition: 'top',
      });
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.playlistUnsubscribe();
    this.playingUnsubscribe();
    this.subscription.unsubscribe();
  }
}
