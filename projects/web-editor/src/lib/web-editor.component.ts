import { Component, Input} from '@angular/core';
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
      <toolbar (toggleEvent)="onToggleStatusChange($event)"></toolbar>
      <div id="editBox" >
        <editbox [valid]="toolbarToggleStatus" [text]="text"></editbox>
      </div>
    </div>

  `,
  styles: `
    #content{
      overflow: hidden;
      width: 100%;
      height: 100%;
      padding: 5px;
      border:1px solid black;

    }

    #editBox{
      /*float: right;*/

      /*width: 100%;*/
      /*height: 90%;*/
      /*background-color: red;*/
      margin-right: 200px;


    }



  `
})
export class WebEditorComponent {

  @Input()
  text:string ="";


  // protected readonly toolbar = toolbar;

  toolbarToggleStatus: boolean = false;

  onToggleStatusChange(status: boolean) {
    this.toolbarToggleStatus = status;
  }
}
