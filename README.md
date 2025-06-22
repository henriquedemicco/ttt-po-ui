# PO-UI Components Test - Angular 19

Este projeto foi desenvolvido como parte do teste técnico para Analista Pleno+ da Totvs, implementando dois componentes customizados: **Select** e **Switch**.

## 📋 Sobre o Teste

O desafio consistiu em criar componentes Angular seguindo as especificações do handoff fornecido, com foco em:
- Aparência fiel ao design system
- Compatibilidade com `[(ngModel)]` e Reactive Forms
- Funcionalidades de habilitação/desabilitação
- Página de demonstração interativa

## 🚀 Componentes Implementados

### Select Component
- ✅ Interface de dados: `[{value: "Value", label: "Label"}]`
- ✅ Suporte a `[(ngModel)]` e Reactive Forms
- ✅ Estado disabled
- ✅ Aparência conforme handoff (estados: normal, hover, focus, disabled, error)
- ✅ Opções selecionadas e vazias
- ✅ Itens desabilitados individuais

### Switch Component
- ✅ Valores booleanos (true/false)
- ✅ Suporte a `[(ngModel)]` e Reactive Forms
- ✅ Estado disabled
- ✅ Evento de mudança de valor
- ✅ Aparência conforme handoff (estados: unchecked, checked, hover, focus, disabled)
- ✅ Animações suaves

## 🎨 Design System

Os componentes seguem o design system **Animalia Components** com:
- Tokens de cores customizáveis
- Estados visuais consistentes
- Critérios de acessibilidade (WCAG)
- Responsividade (Desktop, Tablet, Mobile)

## 🛠️ Funcionalidades da Página de Demonstração

A página principal permite:
- Teste interativo dos componentes
- Customização de propriedades em tempo real
- Visualização de diferentes estados
- Integração com formulários reativos
- Console de eventos para debugging

## 📱 Critérios de Acessibilidade Implementados

### Select Component
- **WCAG 2.1.1 (A)**: Navegação por teclado
- **WCAG 2.4.3 (A)**: Ordem lógica de foco
- **WCAG 2.4.7 (A)**: Foco visível
- **WCAG 4.1.2 (A)**: Nome, função e valor adequados
- **WAI-ARIA 3.14**: Comportamentos de Listbox

### Switch Component
- **WCAG 2.1.1 (A)**: Interação via teclado
- **WCAG 2.4.7 (A)**: Foco visível preservado
- **WCAG 2.4.11 (AAA)**: Aparência do foco otimizada
- **WCAG 4.1.2 (A)**: Semântica adequada com `role="switch"`

## 🎯 Tecnologias Utilizadas

- Angular 19
- TypeScript
- SCSS para estilização
- Reactive Forms
- Template-driven Forms

---

## 🔧 Configuração e Comandos do Angular

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 19.0.0.

## Servidor de desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer arquivo de código.

## Geração de código

Execute `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para compilar o projeto. Os artefatos de build serão armazenados no diretório `dist/`.

## Executando testes unitários

Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Executando testes end-to-end

Execute `ng e2e` para executar os testes end-to-end através de uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente capacidades de teste end-to-end.

## Ajuda adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou consulte a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

