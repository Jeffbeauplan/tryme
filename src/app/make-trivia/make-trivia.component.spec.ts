import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTriviaComponent } from './make-trivia.component';

describe('MakeTriviaComponent', () => {
  let component: MakeTriviaComponent;
  let fixture: ComponentFixture<MakeTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeTriviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
