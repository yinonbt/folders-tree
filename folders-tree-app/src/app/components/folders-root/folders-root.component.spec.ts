import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersRootComponent } from './folders-root.component';

describe('FoldersRootComponent', () => {
  let component: FoldersRootComponent;
  let fixture: ComponentFixture<FoldersRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
