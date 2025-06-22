import { Component, inject, ViewChild } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SelectComponent } from '../../components/select/ttt-select.component';
import { PoSelectOption } from '../../components/select/interfaces/po-select-option.interface';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-playground',
  imports: [PoModule, FormsModule, ReactiveFormsModule,SelectComponent],
  templateUrl: './select-playground.component.html',
  styleUrl: './select-playground.component.scss',
})
export class SelectPlaygroundComponent {

  private formBuilder = inject(FormBuilder);
  selectedValue?: string | undefined;
  exampleTemplateFormValue?: string | undefined;
  isDisabled: boolean = false;
  emitedEventType?: string;

  option?: PoSelectOption = { label: '', value: null, isDisabled: false };

  reactiveForm = this.formBuilder.group({
    reactiveSelect: ['', Validators.required],
  })

  inputedOptions: PoSelectOption[] = [
    { label: 'First Option', value: 1, isDisabled: false },
    { label: 'Disabled Option', value: null, isDisabled: true }
  ];

  @ViewChild('tdForm') tdForm?: NgForm;

  addOption() {
    this.inputedOptions.push(this.option!);
    this.resetDefaultOption();
  }

  resetDefaultOption() {
    this.option = { label: '', value: null, isDisabled: false };
  }

  removeOptions() {
    this.inputedOptions.length = 0;
    this.emitedEventType = this.selectedValue = undefined;
  }

  handleNewReceivedEvent(event: Event | FocusEvent) {
    this.emitedEventType = event.type;
    if (event instanceof Event) {
      this.selectedValue = (event.target as HTMLInputElement).value;
    }
  }

  submitTemplateDrivenForm() {
    console.log(this.tdForm)
  }

  subtmitReactiveForm() {
    console.log(this.reactiveForm)
  }
}
