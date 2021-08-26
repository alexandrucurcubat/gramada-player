import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistActionsComponent } from './playlist-actions.component';

describe('PlaylistActionsComponent', () => {
  let component: PlaylistActionsComponent;
  let fixture: ComponentFixture<PlaylistActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
