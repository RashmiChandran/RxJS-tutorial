import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformingOperatorsComponent } from './transforming-operators.component';

describe('TransformingOperatorsComponent', () => {
  let component: TransformingOperatorsComponent;
  let fixture: ComponentFixture<TransformingOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformingOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformingOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
