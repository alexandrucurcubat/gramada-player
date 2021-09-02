import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
})
export class NewUserDialogComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value.username);
      this.dialogRef.close();
    }
  }
}
