import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.scss',
})
export class AppmenuComponent {}
