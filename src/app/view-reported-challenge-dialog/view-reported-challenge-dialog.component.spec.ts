import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedChallengeDialogComponent } from './view-reported-challenge-dialog.component';

describe('ViewReportedChallengeDialogComponent', () => {
  let component: ViewReportedChallengeDialogComponent;
  let fixture: ComponentFixture<ViewReportedChallengeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportedChallengeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportedChallengeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
