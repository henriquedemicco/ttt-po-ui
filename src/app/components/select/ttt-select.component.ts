import { Component, effect, forwardRef, inject, input, output } from '@angular/core';
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

  constructor() {
    effect(() => {
      const currentOptions = this.options();
      const hasValidOptions = currentOptions.length > 0 && 
                             currentOptions.some(option => !option.isDisabled);
      
      if (!hasValidOptions && this.instruction() && this.value) {
        this.resetToInstruction();
      }
    });
  }

  private onChangeFn = (value: string | null) => {};
  private onTouchedFn = () => {};

  get hasValidOptions(): boolean {
    return this.options().length > 0 && 
           this.options().some(option => !option.isDisabled);
  }


  private resetToInstruction(): void {
    this.value = '';
    this.onChangeFn('');
    this.selectedValue.emit('');
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChangeFn(this.value || null);
    this.selectedValue.emit(this.value);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  emitEvent(event: Event): void {
    this.emitedEvent.emit(event);
  }
}