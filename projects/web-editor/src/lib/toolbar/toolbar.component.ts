import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent  {

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



}
