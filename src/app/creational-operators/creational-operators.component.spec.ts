import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationalOperatorsComponent } from './creational-operators.component';

describe('CreationalOperatorsComponent', () => {
  let component: CreationalOperatorsComponent;
  let fixture: ComponentFixture<CreationalOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationalOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationalOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
