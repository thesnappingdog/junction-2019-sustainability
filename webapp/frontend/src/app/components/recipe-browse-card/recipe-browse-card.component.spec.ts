import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBrowseCardComponent } from './recipe-browse-card.component';

describe('RecipeBrowseCardComponent', () => {
  let component: RecipeBrowseCardComponent;
  let fixture: ComponentFixture<RecipeBrowseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeBrowseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBrowseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
