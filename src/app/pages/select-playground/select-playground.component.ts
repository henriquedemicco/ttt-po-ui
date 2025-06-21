import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
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
export class SelectPlaygroundComponent implements AfterViewInit {

  private formBuilder = inject(FormBuilder);
  selectedValue?: string | undefined;
  exampleTemplateFormValue?: string | undefined;
  emitedEventType?: string;
  option?: PoSelectOption = { label: '', value: null, isDisabled: false };

  reactiveForm = this.formBuilder.group({
    reactiveSelect: ['', Validators.required],
  })

  @ViewChild('tdForm') tdForm?: NgForm;

  inputedOptions: PoSelectOption[] = [];

  ngAfterViewInit(): void {
      console.log(this.tdForm)
  }

  teste() {
    console.log(this.exampleTemplateFormValue)
  }

  addOption() {
    this.inputedOptions.push(this.option!);
    this.resetOption();
  }

  resetOption() {
    this.option = { label: '', value: null, isDisabled: false };
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
