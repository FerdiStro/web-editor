import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebEditorService {

  private testString: string = 'default';

  constructor() {}

  getTextData(): string {
    return this.testString;
  }

  setData(newString: string): void {
    this.testString = newString;
  }






}
