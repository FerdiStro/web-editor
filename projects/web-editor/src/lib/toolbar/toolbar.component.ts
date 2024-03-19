import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  @Output() toggleEvent =  new EventEmitter<boolean>();

  toggleState: boolean = false;



  // true = JSON false = Yaml
  toggleSwitch() {
    this.toggleState = !this.toggleState;
    this.toggleEvent.emit(this.toggleState);
  }

}
