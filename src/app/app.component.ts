import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppmenuComponent } from './component/appmenu/appmenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal-fe';
}
