import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {EditboxComponent} from "./editbox/editbox.component";


@Component({
  selector: 'lib-web-editor',
  standalone: true,
  imports: [
    ToolbarComponent,
    EditboxComponent
  ],
  template: `
    <div id="content">
      <toolbar [reset]="numToggle" (toolButtonEvent)="onPressToolButton($event)" (toggleEvent)="onToggleStatusChange($event)"></toolbar>
      <div id="editBox" >
        <editbox [errorMessage]="errorMessage" [valid]="toolbarToggleStatus" [text]="text" [buttonNumber]="buttonId" (resetButton)="resetButton($event)" ></editbox>
      </div>
    </div>

  `,
  styles: `
    #content{
      overflow: hidden;
      width: calc(100% - 20px);
      padding: 5px;
      border:1px solid black;
      height: 100%;
    }

    #editBox{
      /*float: right;*/

      /*width: 100%;*/
      /*height: 90%;*/
      /*background-color: red;*/
      /*margin-right: 200px;*/
      width: calc(100% - 20px);


    }



  `
})
export class WebEditorComponent  implements AfterViewInit{

  @Input()
  text:string ="";

  @Input()
  errorMessage:boolean = false



  buttonId: number = 0
  onPressToolButton(buttonId: number) {
      this.buttonId = buttonId;

  }

  toolbarToggleStatus: boolean = false;
  onToggleStatusChange(status: boolean) {
    this.toolbarToggleStatus = status;
  }

  numToggle:number = 0;
  resetButton(num:number){
    if(this.after){
      this.numToggle = this.numToggle +1 ;
    }
  }

  after:boolean  = false
  ngAfterViewInit() {
    setTimeout(() => {
      this.after = true;
    });

  }

}
