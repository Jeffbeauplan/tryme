import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTriviaComponent } from './play-trivia.component';

describe('PlayTriviaComponent', () => {
  let component: PlayTriviaComponent;
  let fixture: ComponentFixture<PlayTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTriviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
