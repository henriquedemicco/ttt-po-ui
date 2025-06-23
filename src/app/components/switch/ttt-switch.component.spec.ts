import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SwitchComponent } from './ttt-switch.component';

@Component({
  standalone: true,
  imports: [SwitchComponent, FormsModule],
  template: `
    <ttt-switch
      [t-label]="label"
      [t-disabled]="disabled"
      [(ngModel)]="switchValue"
      (emitedEvent)="onEvent($event)"
    >
    </ttt-switch>
  `,
})
class TestHostComponent {
  label = '';
  disabled = false;
  switchValue = false;
  lastEvent: Event | null = null;

  onEvent(event: Event) {
    this.lastEvent = event;
  }
}

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SwitchComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Inicialização do Componente', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve gerar um ID único para o switch', () => {
      expect(component.switchId()).toMatch(/^ttt-switch-[a-z0-9]{7}$/);
    });

    it('deve inicializar com valores padrão', () => {
      expect(component.label()).toBe('');
      expect(component.disabled()).toBe(false);
      expect(component.value()).toBe(false);
    });

    it('deve manter IDs únicos em múltiplas instâncias', () => {
      const fixture2 = TestBed.createComponent(SwitchComponent);
      const component2 = fixture2.componentInstance;

      expect(component.switchId()).not.toBe(component2.switchId());
    });
  });

  describe('Renderização do Template', () => {
    it('deve renderizar o container principal', () => {
      fixture.detectChanges();

      const container = fixture.debugElement.query(
        By.css('.ttt-field-container')
      );
      expect(container).toBeTruthy();
    });

    it('deve renderizar o input switch com atributos corretos', () => {
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.nativeElement.id).toBe(component.switchId());
      expect(inputElement.nativeElement.getAttribute('role')).toBe('switch');
      expect(inputElement.nativeElement.checked).toBe(false);
      expect(inputElement.nativeElement.disabled).toBe(false);
      expect(inputElement.nativeElement.getAttribute('aria-checked')).toBe(
        'false'
      );
    });

    it('deve renderizar o label quando fornecido', () => {
      fixture.componentRef.setInput('t-label', 'Ativar notificações');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('label.ttt-label')
      );
      expect(labelElement).toBeTruthy();
      expect(labelElement.nativeElement.textContent.trim()).toBe(
        'Ativar notificações'
      );
      expect(labelElement.nativeElement.getAttribute('for')).toBe(
        component.switchId()
      );
    });

    it('não deve renderizar o label quando não fornecido', () => {
      fixture.componentRef.setInput('t-label', '');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('label.ttt-label')
      );
      expect(labelElement).toBeFalsy();
    });

    it('deve renderizar os elementos do switch', () => {
      fixture.detectChanges();

      const switchLabel = fixture.debugElement.query(
        By.css('label.ttt-switch')
      );
      const slider = fixture.debugElement.query(By.css('.ttt-switch-slider'));
      const switchLabelText = fixture.debugElement.query(
        By.css('.ttt-switch-label')
      );

      expect(switchLabel).toBeTruthy();
      expect(slider).toBeTruthy();
      expect(switchLabelText).toBeTruthy();
    });

    it('deve aplicar classe disabled quando desabilitado', () => {
      fixture.componentRef.setInput('t-disabled', true);
      fixture.detectChanges();

      const switchLabel = fixture.debugElement.query(
        By.css('label.ttt-switch')
      );
      expect(switchLabel.nativeElement.className).toContain('disabled');
    });

    it('deve exibir o valor do switch no label', () => {
      component.value.set(true);
      fixture.detectChanges();

      const switchLabelText = fixture.debugElement.query(
        By.css('.ttt-switch-label')
      );
      expect(switchLabelText.nativeElement.textContent.trim()).toBe('true');
    });
  });

  describe('Funcionalidade ControlValueAccessor', () => {
    it('deve implementar writeValue corretamente', () => {
      component.writeValue(true);
      expect(component.value()).toBe(true);

      component.writeValue(false);
      expect(component.value()).toBe(false);

      component.writeValue(null as any);
      expect(component.value()).toBe(false);
    });

    it('deve registrar função onChange', () => {
      const mockFn = jasmine.createSpy('onChange');
      component.registerOnChange(mockFn);

      // Simular mudança
      const mockEvent = { target: { checked: true } } as any;
      component.onChange(mockEvent);

      expect(mockFn).toHaveBeenCalledWith(true);
      expect(component.value()).toBe(true);
    });

    it('deve registrar função onTouched', () => {
      const mockFn = jasmine.createSpy('onTouched');
      component.registerOnTouched(mockFn);

      component.onBlur();

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Interações do Switch', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('deve alternar valor ao clicar', () => {
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      // Simular clique para ativar
      inputElement.nativeElement.checked = true;
      inputElement.nativeElement.dispatchEvent(new Event('change'));

      expect(component.value()).toBe(true);
      expect(mockOnChange).toHaveBeenCalledWith(true);

      // Simular clique para desativar
      inputElement.nativeElement.checked = false;
      inputElement.nativeElement.dispatchEvent(new Event('change'));

      expect(component.value()).toBe(false);
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    it('deve chamar onTouched ao perder foco', () => {
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      const mockOnTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(mockOnTouched);

      inputElement.nativeElement.dispatchEvent(new Event('blur'));

      expect(mockOnTouched).toHaveBeenCalled();
    });

    it('deve ativar com Enter quando habilitado', () => {
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      spyOn(inputElement.nativeElement, 'click');

      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
      Object.defineProperty(enterEvent, 'target', {
        value: inputElement.nativeElement,
      });

      component.onKeydown(enterEvent);

      expect(inputElement.nativeElement.click).toHaveBeenCalled();
    });

    it('não deve ativar com Enter quando desabilitado', () => {
      fixture.componentRef.setInput('t-disabled', true);
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      spyOn(inputElement.nativeElement, 'click');

      const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
      Object.defineProperty(enterEvent, 'target', {
        value: inputElement.nativeElement,
      });

      component.onKeydown(enterEvent);

      expect(inputElement.nativeElement.click).not.toHaveBeenCalled();
    });

    it('não deve reagir a outras teclas', () => {
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      spyOn(inputElement.nativeElement, 'click');

      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
      Object.defineProperty(spaceEvent, 'target', {
        value: inputElement.nativeElement,
      });

      component.onKeydown(spaceEvent);

      expect(inputElement.nativeElement.click).not.toHaveBeenCalled();
    });
  });

  describe('Comportamento quando Desabilitado', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('t-disabled', true);
      fixture.detectChanges();
    });

    it('deve desabilitar o input', () => {
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement.nativeElement.disabled).toBe(true);
    });

    it('deve prevenir cliques no container quando desabilitado', () => {
      const container = fixture.debugElement.query(
        By.css('.ttt-field-container')
      );
      const clickEvent = new Event('click');
      spyOn(clickEvent, 'preventDefault');

      container.nativeElement.dispatchEvent(clickEvent);

      expect(clickEvent.preventDefault).toHaveBeenCalled();
    });

    it('não deve prevenir cliques no container quando habilitado', () => {
      fixture.componentRef.setInput('t-disabled', false);
      fixture.detectChanges();

      const container = fixture.debugElement.query(
        By.css('.ttt-field-container')
      );
      const clickEvent = new Event('click');
      spyOn(clickEvent, 'preventDefault');

      container.nativeElement.dispatchEvent(clickEvent);

      expect(clickEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Emissão de Eventos', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('deve emitir eventos personalizados ao mudar', () => {
      spyOn(component.emitedEvent, 'emit');
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );

      const changeEvent = new Event('change');
      inputElement.nativeElement.dispatchEvent(changeEvent);

      expect(component.emitedEvent.emit).toHaveBeenCalledWith(changeEvent);
    });

    it('deve emitir eventos personalizados ao perder foco', () => {
      spyOn(component.emitedEvent, 'emit');
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );

      const blurEvent = new Event('blur');
      inputElement.nativeElement.dispatchEvent(blurEvent);

      expect(component.emitedEvent.emit).toHaveBeenCalledWith(blurEvent);
    });

    it('deve emitir evento ao usar método emitEvent', () => {
      spyOn(component.emitedEvent, 'emit');
      const testEvent = new Event('test');

      component.emitEvent(testEvent);

      expect(component.emitedEvent.emit).toHaveBeenCalledWith(testEvent);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role="switch" no input', () => {
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement.nativeElement.getAttribute('role')).toBe('switch');
    });

    it('deve atualizar aria-checked corretamente', () => {
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );

      // Estado inicial
      expect(inputElement.nativeElement.getAttribute('aria-checked')).toBe(
        'false'
      );

      // Após ativação
      component.value.set(true);
      fixture.detectChanges();
      expect(inputElement.nativeElement.getAttribute('aria-checked')).toBe(
        'true'
      );
    });

    it('deve associar label com input via for/id', () => {
      fixture.componentRef.setInput('t-label', 'Test Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('label.ttt-label')
      );
      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );

      expect(labelElement.nativeElement.getAttribute('for')).toBe(
        inputElement.nativeElement.id
      );
    });
  });

  describe('Integração com ngModel', () => {
    it('deve funcionar com ngModel', fakeAsync(() => {
      hostComponent.switchValue = true;
      hostFixture.detectChanges();
      tick();

      const inputElement = hostFixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement.nativeElement.checked).toBe(true);

      inputElement.nativeElement.checked = false;
      inputElement.nativeElement.dispatchEvent(new Event('change'));

      hostFixture.detectChanges();
      tick();

      expect(hostComponent.switchValue).toBe(false);
    }));

    it('deve atualizar quando ngModel muda programaticamente', fakeAsync(() => {
      hostComponent.switchValue = false;
      hostFixture.detectChanges();
      tick();

      let inputElement = hostFixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement.nativeElement.checked).toBe(false);

      hostComponent.switchValue = true;
      hostFixture.detectChanges();
      tick();

      inputElement = hostFixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );
      expect(inputElement.nativeElement.checked).toBe(true);
    }));
  });

  describe('Estados Visuais', () => {
    it('deve sincronizar checked state com value signal', () => {
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(
        By.css('input[type="checkbox"]')
      );

      // Estado inicial
      expect(inputElement.nativeElement.checked).toBe(component.value());

      // Após mudança
      component.value.set(true);
      fixture.detectChanges();
      expect(inputElement.nativeElement.checked).toBe(component.value());
    });

    it('deve exibir texto do valor no switch label', () => {
      fixture.detectChanges();

      const switchLabelText = fixture.debugElement.query(
        By.css('.ttt-switch-label')
      );

      // Estado inicial (false)
      expect(switchLabelText.nativeElement.textContent.trim()).toBe('false');

      // Após ativação (true)
      component.value.set(true);
      fixture.detectChanges();
      expect(switchLabelText.nativeElement.textContent.trim()).toBe('true');
    });
  });

  describe('Tratamento de Valores Booleanos', () => {
    it('deve tratar valores truthy/falsy corretamente', () => {
      // Valores truthy
      component.writeValue(1 as any);
      expect(component.value()).toBe(true);

      component.writeValue('true' as any);
      expect(component.value()).toBe(true);

      // Valores falsy
      component.writeValue(0 as any);
      expect(component.value()).toBe(false);

      component.writeValue('' as any);
      expect(component.value()).toBe(false);

      component.writeValue(undefined as any);
      expect(component.value()).toBe(false);
    });

    it('deve emitir valores booleanos corretos', () => {
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      // Simular ativação
      const activateEvent = { target: { checked: true } } as any;
      component.onChange(activateEvent);
      expect(mockOnChange).toHaveBeenCalledWith(true);

      // Simular desativação
      const deactivateEvent = { target: { checked: false } } as any;
      component.onChange(deactivateEvent);
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });
  });
});
