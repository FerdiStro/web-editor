import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import * as yaml from 'js-yaml';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'editbox',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgStyle
  ],
  templateUrl: './editbox.component.html',
  styleUrl: './editbox.component.css'
})
export class EditboxComponent implements  OnChanges{




  @Input() text: string = '';
  textLines: string[] = [];
  lines:number = 0;

  @Input() valid: boolean = false;


  editorLines(): number[] {
    return Array.from({length: this.lines}, (_, index) => index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['text'] != undefined){
      if (changes['text'].currentValue && changes['text']) {
        this.textLines = this.text.split("\n")
        this.lines = this.text.split("\n").length
      }
    }
    this.validOnChange();
  }

  onInput(event: Event) {

    const editedContent = (event.target as HTMLElement).textContent;
    this.text = editedContent || '';

    const test = (event.target as HTMLElement).outerHTML;



    this.lines = test.split("</div>").length + test.split("<br>").length - test.split("<br></div>").length - 1;


    this.validOnChange();

  }

  textValidStyle =  {
    'border': '1px solid gray'
  };

  errorString:string = '';
  validOnChange(): void {
    let val = false;

    if(this.valid){
      try {
        JSON.parse(this.text);
        val = true;

      } catch (error) {
        val = false;
        // @ts-ignore
        let test =  error.toString();
        this.errorString = test


        let col = test.split("column")[1].split(")")[0];
        console.log(col)





      }
    }
    if(!this.valid){
      try {
        yaml.load(this.text)
        val = true;


      }catch (error) {
        val = false;
        // @ts-ignore
        let test =  error.toString();
        this.errorString = test
      }
    }

    if(!val){
      this.textValidStyle = {
        'border':'1px solid red'
      };
    }else {
      this.errorString = 'Valid'


      this.textValidStyle = {
        'border':'1px solid grey'
      };
    }

  }






  onKeyDown(event: KeyboardEvent): void {
    const editedContent = (event.target as HTMLElement).textContent;
    this.text = editedContent || '';

    if (event.key === 'Tab') {
      event.preventDefault();
      document.execCommand('insertText', false, '\t');

    }
  }

  get renderedTextLines(): string {
    return this.textLines.map(line => this.escapeHtml(line)).join('<br>'); // Konvertiert Textzeilen in HTML mit <br> für Zeilenumbrüche
  }





  escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\t/g, '&emsp;');
  }





}
