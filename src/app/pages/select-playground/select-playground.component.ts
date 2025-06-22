import { Component, inject, ViewChild } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SelectComponent } from '../../components/select/ttt-select.component';
import { PoSelectOption } from '../../components/select/interfaces/po-select-option.interface';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectState } from '../../components/select/interfaces/select-state.interface';
import { SwitchComponent } from '../../components/switch/ttt-switch.component';

@Component({
  selector: 'app-select-playground',
  imports: [
    PoModule, 
    FormsModule, 
    ReactiveFormsModule,
    SelectComponent,
    SwitchComponent
  ],
  templateUrl: './select-playground.component.html',
  styleUrl: './select-playground.component.scss',
})
export class SelectPlaygroundComponent {

  private formBuilder = inject(FormBuilder);
  @ViewChild('tdForm') tdForm?: NgForm;

  selectedValue?: string | null;
  exampleTemplateFormValue?: string | null;
  emitedEventType?: string;
  selectInstruction: string = "Selecione uma opção";
  isOptionDisabled: boolean = false;

  selectState: SelectState = {
    fillingInstruction: "",
    isDisabled: false,
    isRequired: false
  }

  option?: PoSelectOption = { label: '', value: null, isDisabled: false };

  reactiveForm = this.formBuilder.group({
    reactiveSelect: ['', Validators.required],
  })

  inputedOptions: PoSelectOption[] = [
    { label: 'First Option', value: 1, isDisabled: false },
    { label: 'Disabled Option', value: null, isDisabled: true }
  ];


  addOption() {
    this.option!.isDisabled = this.isOptionDisabled;
    this.inputedOptions.push({...this.option!});
    this.resetDefaultOption();
  }

  resetDefaultOption() {
    this.option = { label: '', value: null, isDisabled: this.isOptionDisabled };
  }

  removeOptions() {
    this.inputedOptions.length = 0;
    this.emitedEventType = this.selectedValue = undefined;
    this.reactiveForm.reset();
    this.exampleTemplateFormValue = this.selectedValue = null;
  }

  resetStateManagerForm() {
    this.selectState = {
      fillingInstruction: "",
      isDisabled: false,
      isRequired: false
    }
  }

  handleNewReceivedEvent(event: Event | FocusEvent) {
    this.emitedEventType = event.type;
    if (!(event instanceof FocusEvent)) {
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
