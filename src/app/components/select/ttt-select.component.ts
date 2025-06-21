import { Component, forwardRef, inject, input, output } from '@angular/core';
import { PoSelectOption } from './interfaces/po-select-option.interface';
import { PoModule } from '@po-ui/ng-components';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'ttt-select',
  imports: [PoModule],
  templateUrl: './ttt-select.component.html',
  styleUrl: './ttt-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  options = input<PoSelectOption[]>([], { alias: 'p-options' });
  icon = input<string>('', { alias: 'p-icon' });
  instruction = input<string>('', { alias: 'p-instruction' });
  value: string = "";
  name = input<string>('', { alias: 'p-name' });
  disabled = input<boolean>(false, { alias: 'p-disabled' });
  selectedValue = output<string | number>();
  emitedEvent = output<Event>();

  // Callbacks do ControlValueAccessor
  private onChangeFn = (value: string) => {};
  private onTouchedFn = () => {};

  // Implementações do ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementação opcional para controlar o estado disabled
  }

  // Métodos para eventos
  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChangeFn(this.value);
    this.selectedValue.emit(this.value);
    console.log(this.value);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  emitEvent(event: Event): void {
    this.emitedEvent.emit(event);
  }
}