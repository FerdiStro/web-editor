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
      test
<!--      <toolbar ></toolbar>-->
      <editbox [text]="text"></editbox>
    </div>

  `,
  styles: `
    #content{
      overflow: hidden;
      width: 100%;
      background-color: pink;
      padding: 5px;

    }

  `
})
export class WebEditorComponent {

  @Input()
  text:string ="";




}
