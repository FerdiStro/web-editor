import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import  { TagComponent } from '@ferdinond/web-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-editor';
}
