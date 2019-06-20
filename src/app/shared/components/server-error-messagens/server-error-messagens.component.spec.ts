import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorMessagensComponent } from './server-error-messagens.component';

describe('ServerErrorMessagensComponent', () => {
  let component: ServerErrorMessagensComponent;
  let fixture: ComponentFixture<ServerErrorMessagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorMessagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorMessagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
