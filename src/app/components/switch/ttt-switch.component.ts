import { Component, input, output } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'ttt-switch',
  imports: [PoModule],
  templateUrl: './ttt-switch.component.html',
  styleUrl: './ttt-switch.component.scss'
})
export class SwitchComponent {

  label = input<string>();
  disabled = input<boolean>(false, { alias: 'p-disabled' });
  valueChanged = output<boolean>();
  value: boolean = false;
  
}
