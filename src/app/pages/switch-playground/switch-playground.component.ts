import { Component } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
import { SwitchComponent } from '../../components/switch/ttt-switch.component';

@Component({
  selector: 'app-switch-playground',
  imports: [PoPageModule, SwitchComponent],
  templateUrl: './switch-playground.component.html',
  styleUrl: './switch-playground.component.scss'
})
export class SwitchPlaygroundComponent {

  teste(event: any) {
    console.log(event)
  }

}
