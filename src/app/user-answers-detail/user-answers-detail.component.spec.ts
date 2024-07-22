import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswersDetailComponent } from './user-answers-detail.component';

describe('UserAnswersDetailComponent', () => {
  let component: UserAnswersDetailComponent;
  let fixture: ComponentFixture<UserAnswersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAnswersDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAnswersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
