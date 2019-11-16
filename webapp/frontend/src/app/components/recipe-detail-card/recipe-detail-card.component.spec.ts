import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailCardComponent } from './recipe-detail-card.component';

describe('RecipeDetailCardComponent', () => {
  let component: RecipeDetailCardComponent;
  let fixture: ComponentFixture<RecipeDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
