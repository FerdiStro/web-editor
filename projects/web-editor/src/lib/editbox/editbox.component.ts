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




  @Input() text: string = '';
  textLines: string[] = [];
  lines:number = 0;

  @Input() valid: boolean = false;

  @Input()  errorMessage:boolean  = false
  @Input()  buttonNumber : number = 0;
  @Output() resetButton: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild('textarea') textarea!: ElementRef;




  editorLines(): number[] {
    return Array.from({length: this.lines}, (_, index) => index);
  }

  ngAfterViewInit() {
    this.history()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['text'] != undefined){
      if (changes['text'].currentValue && changes['text']) {
        this.textLines = this.text.split("\n")
        this.lines = this.textLines.length
      }
    }

    if (changes['buttonNumber'] != undefined) {
      this.handleButtonNumber();

    }

    this.validOnChange();
  }



  onInput(event: Event) {
    const editedContent = (event.target as HTMLElement).textContent;

    console.log(event)
    // if(event == 'Enter'){
    //
    // }

    this.text = editedContent || '';
    // const outerHTML = (event.target as HTMLElement).outerHTML;
    // this.lines = (event.target as HTMLElement).outerHTML.split("</div>").length + outerHTML.split("<br>").length - outerHTML.split("<br></div>").length - 1;



    // console.log(    this.getRenderText)
    // console.log(this.renderedTextLines)
    // console.log(this.textLines)
    // console.log(this.textAsLine)



  }




  historyList:string[]  = [] ;
  history() : void {
    if(this.historyList.length < 10){
      if(this.historyList.length  == 0){
        this.historyList.push(this.text)
      }else{
        let push  = this.textarea.nativeElement.outerHTML.replaceAll("<br>", "\n").replaceAll("</div>", "").replaceAll('<div>','\n').replaceAll("<span style=\"white-space:pre\">\t</span>", '\t').replaceAll("&nbsp;"," ").split(">")[1];
        this.historyList.push(push)
      }
    }else{
      this.historyList.shift()
      let push  = this.textarea.nativeElement.outerHTML.replaceAll("<br>", "\n").replaceAll("</div>", "").replaceAll('<div>','\n').replaceAll("<span style=\"white-space:pre\">\t</span>", '\t').replaceAll("&nbsp;"," ").split(">")[1];
      this.historyList.push(push)

    }
    this.resetButton.emit(0)




  }
  handleButtonNumber():void {

    const selector: number =  this.historyList.length + this.buttonNumber


    if(selector >= 0 && selector < this.historyList.length){

      this.textLines = this.historyList[selector].split("\n")
      this.lines = this.textLines.length

      if(selector > 1){
        return

      }

    }

    if ((selector >= 0  && this.buttonNumber * -1 <= this.historyList.length -1 ) || (selector <= 0  && this.buttonNumber * -1 >= this.historyList.length -1)){
      setTimeout(() => {
          this.buttonNumber= 0;
          this.resetButton.emit(0)
        }
      )
      return;
    }






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
      this.history()
    }
    if (event.key == 'Enter'){
      event.preventDefault();
      document.execCommand('insertText', false, '\n');
      this.history()
    }
  }

  textAsLine  : string  = ''

  get getRenderText():string{
     return this.textLines.map(line => this.unescapeHtml(line)).join('\n');
  }

  get renderedTextLines(): string {
    this.textAsLine= this.textLines.map(line => this.escapeHtml(line)).join('<br>');
    return  this.textAsLine;
  }



  unescapeHtml(safe: string): string {
    return safe.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&emsp;/g, '\t');
  }


  escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\t/g, '&emsp;');
  }





}
