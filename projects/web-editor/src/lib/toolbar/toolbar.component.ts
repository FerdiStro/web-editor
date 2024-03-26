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
export class ToolbarComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['reset']){
      this.countButton =  0;
    }
  }

  @Output() toggleEvent: EventEmitter<boolean> =  new EventEmitter<boolean>();
  toggleState: boolean = false;

  @Output()  toolButtonEvent: EventEmitter<number> = new EventEmitter<number>()


  countButton :  number =  0;

  @Input()
  reset: number  = 0 ;



  pressUndoButton(buttonId: number){
    if(buttonId == 0){
      this.countButton  = this.countButton - 1;
    }
    if(buttonId == 1){
      this.countButton  = this.countButton + 1;

    }
    this.toolButtonEvent.emit(this.countButton);
  }
  // true = JSON false = Yaml
  toggleSwitch() {
    this.toggleState = !this.toggleState;
    this.toggleEvent.emit(this.toggleState);
  }

}
