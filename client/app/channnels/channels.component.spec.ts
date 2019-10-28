import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannnelsComponent } from './channnels.component';

describe('ChannnelsComponent', () => {
  let component: ChannnelsComponent;
  let fixture: ComponentFixture<ChannnelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannnelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
