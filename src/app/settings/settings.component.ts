import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { PlayerService } from '../player/player.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  autoplay: boolean;
  usernameForm: FormGroup;
  currentUsername$: Observable<string | null>;
  oldUsername: string | null;
  private subscription = new Subscription();

  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.autoplay = this.playerService.isAutoplay();
    this.currentUsername$ = this.userService.currentUsername$;
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]],
    });
    this.subscription.add(
      this.currentUsername$.subscribe((username) => {
        this.oldUsername = username;
        this.usernameForm.controls.username.setValue(username);
      })
    );
  }

  get username() {
    return this.usernameForm.get('username');
  }

  onToggleAutoplay() {
    this.playerService.setAutoplay(!this.autoplay);
  }

  onUpdateUsername() {
    if (this.usernameForm.valid && this.oldUsername) {
      const newUsername = this.usernameForm.value.username;
      this.userService.update(this.oldUsername, newUsername);
      this.oldUsername = newUsername;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
