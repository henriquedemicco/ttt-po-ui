import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SelectComponent } from './ttt-select.component';
import { PoSelectOption } from './interfaces/po-select-option.interface';

@Component({
  standalone: true,
  imports: [SelectComponent, FormsModule],
  template: `
    <ttt-select
      [t-options]="options"
      [t-icon]="icon"
      [t-instruction]="instruction"
      [t-name]="name"
      [t-disabled]="disabled"
      [(ngModel)]="selectedValue"
      (emitedEvent)="onEvent($event)">
    </ttt-select>
  `
})
class TestHostComponent {
  options: PoSelectOption[] = [];
  icon = '';
  instruction = '';
  name = '';
  disabled = false;
  selectedValue = '';
  lastEvent: Event | null = null;

  onEvent(event: Event) {
    this.lastEvent = event;
  }
}

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SelectComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Inicialização do Componente', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve gerar um ID único para o select', () => {
      expect(component.idSelect()).toMatch(/^ttt-switch-[a-z0-9]{7}$/);
    });

    it('deve inicializar com valores padrão', () => {
      expect(component.options()).toEqual([]);
      expect(component.icon()).toBe('');
      expect(component.instruction()).toBe('');
      expect(component.name()).toBe('');
      expect(component.disabled()).toBe(false);
      expect(component.value).toBe('');
    });
  });

  describe('Renderização do Template', () => {
    it('deve renderizar o select com atributos corretos', () => {
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: false },
        { value: '2', label: 'Opção 2', isDisabled: false }
      ]);
      fixture.componentRef.setInput('t-name', 'test-select');
      fixture.componentRef.setInput('t-disabled', true);
      
      fixture.detectChanges();

      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement).toBeTruthy();
      expect(selectElement.nativeElement.id).toBe(component.idSelect());
      expect(selectElement.nativeElement.name).toBe('test-select');
      expect(selectElement.nativeElement.disabled).toBe(true);
    });

    it('deve renderizar opção de instrução quando fornecida', () => {
      fixture.componentRef.setInput('t-instruction', 'Selecione uma opção');
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: false }
      ]);
      
      fixture.detectChanges();

      const instructionOption = fixture.debugElement.query(By.css('option[value=""]'));
      expect(instructionOption).toBeTruthy();
      expect(instructionOption.nativeElement.textContent.trim()).toBe('Selecione uma opção');
      expect(instructionOption.nativeElement.disabled).toBe(true);
    });

    it('deve renderizar todas as opções fornecidas', () => {
      const testOptions: PoSelectOption[] = [
        { value: '1', label: 'Opção 1', isDisabled: false },
        { value: '2', label: 'Opção 2', isDisabled: true },
        { value: '3', label: 'Opção 3', isDisabled: false }
      ];
      
      fixture.componentRef.setInput('t-options', testOptions);
      fixture.detectChanges();

      const optionElements = fixture.debugElement.queryAll(By.css('option:not([value=""])'));
      expect(optionElements.length).toBe(3);
      
      optionElements.forEach((option, index) => {
        expect(option.nativeElement.value).toBe(testOptions[index].value);
        expect(option.nativeElement.textContent.trim()).toBe(testOptions[index].label);
        expect(option.nativeElement.disabled).toBe(testOptions[index].isDisabled);
      });
    });

    it('deve renderizar o ícone quando fornecido', () => {
      fixture.componentRef.setInput('t-icon', 'fa-user');
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('i'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.nativeElement.className).toContain('input-icon');
      expect(iconElement.nativeElement.className).toContain('fa-user');
    });

    it('não deve renderizar o ícone quando não fornecido', () => {
      fixture.componentRef.setInput('t-icon', '');
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('i'));
      expect(iconElement).toBeFalsy();
    });
  });

  describe('Funcionalidade ControlValueAccessor', () => {
    it('deve implementar writeValue corretamente', () => {
      component.writeValue('test-value');
      expect(component.value).toBe('test-value');
      
      component.writeValue(null as any);
      expect(component.value).toBe('');
    });

    it('deve registrar função onChange', () => {
      const mockFn = jasmine.createSpy('onChange');
      component.registerOnChange(mockFn);
      
      // Simular mudança
      const mockEvent = { target: { value: 'new-value' } } as any;
      component.onChange(mockEvent);
      
      expect(mockFn).toHaveBeenCalledWith('new-value');
    });

    it('deve registrar função onTouched', () => {
      const mockFn = jasmine.createSpy('onTouched');
      component.registerOnTouched(mockFn);
      
      component.onBlur();
      
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Eventos do Select', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: false },
        { value: '2', label: 'Opção 2', isDisabled: false }
      ]);
      fixture.detectChanges();
    });

    it('deve atualizar valor ao mudar seleção', () => {
      const selectElement = fixture.debugElement.query(By.css('select'));
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      selectElement.nativeElement.value = '2';
      selectElement.nativeElement.dispatchEvent(new Event('change'));

      expect(component.value).toBe('2');
      expect(mockOnChange).toHaveBeenCalledWith('2');
    });

    it('deve chamar onTouched ao perder foco', () => {
      const selectElement = fixture.debugElement.query(By.css('select'));
      const mockOnTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(mockOnTouched);

      selectElement.nativeElement.dispatchEvent(new Event('blur'));

      expect(mockOnTouched).toHaveBeenCalled();
    });

    it('deve emitir eventos personalizados', () => {
      spyOn(component.emitedEvent, 'emit');
      const selectElement = fixture.debugElement.query(By.css('select'));

      const changeEvent = new Event('change');
      const blurEvent = new Event('blur');
      const focusEvent = new Event('focus');

      selectElement.nativeElement.dispatchEvent(changeEvent);
      selectElement.nativeElement.dispatchEvent(blurEvent);
      selectElement.nativeElement.dispatchEvent(focusEvent);

      expect(component.emitedEvent.emit).toHaveBeenCalledTimes(3);
    });
  });

  describe('Validação de Opções', () => {
    it('deve identificar quando há opções válidas', () => {
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: false },
        { value: '2', label: 'Opção 2', isDisabled: true }
      ]);
      fixture.detectChanges();
      
      expect(component.hasValidOptions).toBe(true);
    });

    it('deve identificar quando não há opções válidas', () => {
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: true },
        { value: '2', label: 'Opção 2', isDisabled: true }
      ]);
      fixture.detectChanges();
      
      expect(component.hasValidOptions).toBe(false);
    });

    it('deve identificar quando não há opções', () => {
      fixture.componentRef.setInput('t-options', []);
      fixture.detectChanges();
      
      expect(component.hasValidOptions).toBe(false);
    });
  });

  describe('Efeito de Reset para Instrução', () => {
    it('deve resetar para instrução quando não há opções válidas', () => {
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);
      fixture.componentRef.setInput('t-instruction', 'Selecione uma opção');
      component.value = 'some-value';
      
      // Simular mudança para opções inválidas
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: true }
      ]);
      
      fixture.detectChanges();
      
      expect(component.value).toBe('');
      expect(mockOnChange).toHaveBeenCalledWith('');
    });

    it('não deve resetar quando há opções válidas', () => {
      fixture.componentRef.setInput('t-instruction', 'Selecione uma opção');
      component.value = 'some-value';
      
      fixture.componentRef.setInput('t-options', [
        { value: '1', label: 'Opção 1', isDisabled: false }
      ]);
      
      fixture.detectChanges();
      
      expect(component.value).toBe('some-value');
    });
  });

  describe('Integração com ngModel', () => {
    it('deve funcionar com ngModel', async () => {
      hostComponent.options = [
        { value: '1', label: 'Opção 1', isDisabled: false },
        { value: '2', label: 'Opção 2', isDisabled: false }
      ];
      hostComponent.selectedValue = '1';
      
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const selectElement = hostFixture.debugElement.query(By.css('select'));
      expect(selectElement.nativeElement.value).toBe('1');

      // Testar mudança via interface
      selectElement.nativeElement.value = '2';
      selectElement.nativeElement.dispatchEvent(new Event('change'));
      
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      expect(hostComponent.selectedValue).toBe('2');
    });
  });

  describe('Tratamento de Valores Nulos/Vazios', () => {
    it('deve tratar valores nulos como string vazia', () => {
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      const mockEvent = { target: { value: '' } } as any;
      component.onChange(mockEvent);

      expect(component.value).toBe('');
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    it('deve manter valores não vazios', () => {
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      const mockEvent = { target: { value: 'test' } } as any;
      component.onChange(mockEvent);

      expect(component.value).toBe('test');
      expect(mockOnChange).toHaveBeenCalledWith('test');
    });
  });

  describe('Acessibilidade e Atributos', () => {
    it('deve aplicar atributo disabled corretamente', () => {
      fixture.componentRef.setInput('t-disabled', true);
      fixture.detectChanges();

      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement.nativeElement.disabled).toBe(true);
    });

    it('deve aplicar name corretamente', () => {
      fixture.componentRef.setInput('t-name', 'test-name');
      fixture.detectChanges();

      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement.nativeElement.name).toBe('test-name');
    });

    it('deve manter ID único em múltiplas instâncias', () => {
      const fixture2 = TestBed.createComponent(SelectComponent);
      const component2 = fixture2.componentInstance;

      expect(component.idSelect()).not.toBe(component2.idSelect());
    });
  });
});