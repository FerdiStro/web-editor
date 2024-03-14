import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEditorComponent } from './web-editor.component';

describe('WebEditorComponent', () => {
  let component: WebEditorComponent;
  let fixture: ComponentFixture<WebEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
