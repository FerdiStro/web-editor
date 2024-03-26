import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges, ViewChild
} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit  {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


  // YAML/JSON-Button
  @Output() toggleEvent: EventEmitter<boolean> =  new EventEmitter<boolean>();
  toggleState: boolean = false;
  toggleSwitch() {
    this.toggleState = !this.toggleState;
    this.toggleEvent.emit(this.toggleState);
  }

  // Undo-Button
  @Output() toggleUndoEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleUndoState:boolean  = false
  toggleUndo(){
    this.toggleUndoState  = !this.toggleUndoState;
    this.toggleUndoEvent.emit(this.toggleUndoState);
  }


  // Redo-Button
  @Output() toggleRedoEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleRedoState:boolean  = false;
  toggleRedo(){
    this.toggleRedoState = !this.toggleRedoState;
    this.toggleRedoEvent.emit(this.toggleRedoState);
  }

  // Search-Section
  show:boolean  = false;

  model:string = ''
  @Output() toggleSearchBarEvent:EventEmitter<string> = new EventEmitter<string>();
  searchOnChange(event: string){
    this.toggleSearchBarEvent.emit(event)
  }

  toggleSearch(){
    this.show  =  !this.show

    setTimeout(() => {
      if(this.show){
        this.setFocusOnInput();
      }else{
        this.setFocusOnEditor();
      }
    });
  }

  ngOnInit(): void {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'f') {
        this.toggleSearch();
        event.preventDefault();
        setTimeout(() => {
          this.setFocusOnInput(); // Fokussiert das Eingabefeld nach einer kurzen Verzögerung
        });

      }
    });
  }

  private setFocusOnInput(): void {
    const inputElement = this.elementRef.nativeElement.querySelector('input[type="search"]');
    if (inputElement) {
      this.renderer.selectRootElement(inputElement).focus();
    }
  }


  private setFocusOnEditor(): void {
    const divElement = document.querySelector('.editor');
    if (divElement) {
      this.renderer.selectRootElement(divElement).focus();
    }
  }







}
