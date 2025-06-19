import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  router = inject(Router);
  
  menuItemSelected?: string;

  menus: Array<PoMenuItem> = [
    { label: 'Início', icon: 'an an-user', action: this.navigateTo.bind(this, "home"), shortLabel: 'Início' },
    {
      label: 'Componentes',
      icon: 'an an-share',
      shortLabel: 'Componentes',
      subItems: [
        { label: 'Select', action: this.navigateTo.bind(this, "select"), },
        { label: 'Switch', action: this.navigateTo.bind(this, "switch"), }
      ]
    }
  ];

  private navigateTo(destination: string) {
    this.router.navigate([destination]);
  }
}
