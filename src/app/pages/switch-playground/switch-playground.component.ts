import { Component, inject, ViewChild } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SwitchComponent } from '../../components/switch/ttt-switch.component';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SwitchState } from '../../components/switch/interfaces/switch-state.interface';

@Component({
  selector: 'app-switch-playground',
  imports: [PoModule, SwitchComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './switch-playground.component.html',
  styleUrl: './switch-playground.component.scss'
})
export class SwitchPlaygroundComponent {
  private formBuilder = inject(FormBuilder);
  @ViewChild('tdForm') tdForm?: NgForm;

  selectedValue: boolean = false;
  exampleTemplateFormValue: boolean = false;
  emitedEventType?: string;

  reactiveForm = this.formBuilder.group({
    reactiveSwitch: [false],
  })

  switchState: SwitchState = {
    label: "",
    isDisabled: false,
  }

  resetStateManagerForm() {
    this.switchState = {
      label: "",
      isDisabled: false
    }
  }

  handleNewReceivedEvent(event: Event | FocusEvent) {
    this.emitedEventType = event.type;
    if (! (event instanceof FocusEvent)) {
      this.selectedValue = (event.target as HTMLInputElement).checked ? true : false;
    }
  }

  submitTemplateDrivenForm() {
    console.log(this.tdForm)
  }

  subtmitReactiveForm() {
    console.log(this.reactiveForm)
  }
  

}
