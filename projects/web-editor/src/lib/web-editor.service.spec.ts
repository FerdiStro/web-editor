import { TestBed } from '@angular/core/testing';

import { WebEditorService } from './web-editor.service';

describe('WebEditorService', () => {
  let service: WebEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
