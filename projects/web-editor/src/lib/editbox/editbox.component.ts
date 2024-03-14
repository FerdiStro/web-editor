import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import * as yaml from 'js-yaml';


@Component({
  selector: 'editbox',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './editbox.component.html',
  styleUrl: './editbox.component.css'
})
export class EditboxComponent implements OnChanges{



  @Input() text: string = '';
  textLines: string[] = [];



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'].currentValue && changes['text']) {
      this.onTextChanged();
    }
  }


  onTextChanged(): void {
    this.textLines = this.text.split("\n");

      //todo: toggle switch JSON/YAML

      //Json-Valid
      try {
        const jsonObject = JSON.parse(this.text);
        console.log(jsonObject)

      } catch (error) {
        console.log(error)
      }
      //Yaml-Valid

    try {
      const yamlObject = yaml.load(this.text)
      console.log(yamlObject);
    } catch (error) {
      console.log(error);
    }

  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const tabCharacter = '  ';
      const tabbedValue = textarea.value.substring(0, start) + tabCharacter + textarea.value.substring(end);


      textarea.value = tabbedValue;
      textarea.setSelectionRange(start + tabCharacter.length, start + tabCharacter.length);
    }
  }



}
