import { Component, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'ttt-switch',
  imports: [PoModule],
  templateUrl: './ttt-switch.component.html',
  styleUrl: './ttt-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  label = input<string>('', { alias: 't-label' });
  disabled = input<boolean>(false, { alias: 't-disabled' });

  value = signal<boolean>(false);
  emitedEvent = output<Event>();

  private onChangeFn = (value: boolean) => {};
  private onTouchedFn = () => {};

  writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.value.set(newValue);
    this.onChangeFn(newValue);
    this.emitEvent(event);
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.disabled()) {
      const target = event.target as HTMLInputElement;
      target.click();
    }
  }

  emitEvent(event: Event): void {
    this.emitedEvent.emit(event);
  }
}
