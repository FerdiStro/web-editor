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
      <toolbar (toggleSearchBarEvent)="onToggleSearchBar($event)"  (toggleRedoEvent)="onToggleRedoButton($event)" (toggleUndoEvent)="onToggleUndoButton($event)" (toggleEvent)="onToggleStatusChange($event)"></toolbar>
      <div id="editBox" >
        <editbox [searchText]="searchText" [errorMessage]="errorMessage" [undoPress]="undoButton" [redoPress]="redoButton"  [valid]="toolbarToggleStatus" [text]="text"  ></editbox>
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
    ::ng-deep .highlighted-text{
      background-color: yellow;
    }




  `
})
export class WebEditorComponent {

  @Input()
  text:string ="";

  @Input()
  errorMessage:boolean = false


  toolbarToggleStatus: boolean = false;
  onToggleStatusChange(status: boolean) {
    this.toolbarToggleStatus = status;
  }

  undoButton:boolean  =false;
  onToggleUndoButton(status: boolean){
    this.undoButton = status;
  }

  redoButton:boolean  = false;
  onToggleRedoButton(status: boolean){
    this.redoButton = status;
  }

  searchText:string = ''
  onToggleSearchBar(searchText: string){
    // console.log("APP: " + searchText);
    this.searchText  = searchText;
  }




}
