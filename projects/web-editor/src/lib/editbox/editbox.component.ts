import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import * as yaml from 'js-yaml';


@Component({
  selector: 'editbox',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgStyle,
    NgIf
  ],
  templateUrl: './editbox.component.html',
  styleUrl: './editbox.component.css'
})
export class EditboxComponent implements AfterViewInit,  OnChanges{

  /*
    Outer Inputs
   */
  @Input() text: string = '';
  @Input()  errorMessage:boolean  = false

  /*
    Buttons
   */
  @Input() valid: boolean = false;
  @Input() undoPress: boolean  = false;
  @Input() redoPress: boolean  = false;


  /*
    Edit Window
   */
  textLines: string[] = [];
  lines:number = 0;





  @ViewChild('textarea') textarea!: ElementRef;




  editorLines(): number[] {
    return Array.from({length: this.lines}, (_, index) => index);
  }

  ngAfterViewInit() {
    // this.history()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['text'] != undefined){
      if (changes['text'].currentValue && changes['text']) {
        this.textLines = this.text.split("\n")
        this.lines = this.textLines.length
      }
    }

    if (changes['buttonNumber'] != undefined) {

    }
    if (changes['undoPress'] != undefined) {
      document.execCommand('undo');
    }
    if (changes['redoPress'] != undefined) {
      document.execCommand('redo');
    }
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
        // test.split("column")[1].split(")")[0];
      }
    }
    if(!this.valid){
      try {
        yaml.load(this.text)
        val = true;
      }catch (error) {
        val = false;
        // @ts-ignore
        this.errorString = error.toString()
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
    if (event.key == 'Enter'){
      event.preventDefault();
      document.execCommand('insertText', false, '\n');
    }
  }

  get renderedTextLines(): string {
    return  this.textLines.map(line => this.escapeHtml(line)).join('<br>');
  }

  escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\t/g, '&emsp;');
  }



}
