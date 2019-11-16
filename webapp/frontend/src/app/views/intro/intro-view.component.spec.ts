import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroViewComponent } from './intro-view.component';

describe('IntroViewComponent', () => {
  let component: IntroViewComponent;
  let fixture: ComponentFixture<IntroViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
