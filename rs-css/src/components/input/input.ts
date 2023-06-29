import './input.css';
import CodeMirror from 'codemirror';
import ListLevels from '../../assets/data/level.json';
import { LevelsInterface } from '../../assets/data/interface';
import EventEmitter from '../control/EventEmitter';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';

class Input {
  private codeMirror: typeof CodeMirror;

  private listLevels: LevelsInterface[];

  private elements: {
    inputEnter: HTMLInputElement | null;
    btnEnter: Element | null;
    inputField: Element | null;
  };

  private emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this.emmiter = emmiter;
    this.codeMirror = CodeMirror;
    this.listLevels = ListLevels;
    this.start();
    this.selectorInputArea();
    this.elements = {
      inputEnter: null,
      btnEnter: null,
      inputField: null,
    };
    this.emmiter.subscribe('help', this.addHintInputField.bind(this));
  }

  private start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.editorLeft();
    });
  }

  private editorLeft(): void {
    const editor = document.querySelector('.css-window');
    if (editor instanceof HTMLTextAreaElement) {
      const codeMirrorInstance = this.codeMirror.fromTextArea(editor, {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'css',
        indentUnit: 2,
        indentWithTabs: true,
        theme: '3024-day',
        lineWrapping: true,
        viewportMargin: Infinity,
        firstLineNumber: 2,
        lineWiseCopyCut: false,
        undoDepth: 50,
      });
      codeMirrorInstance.getWrapperElement().classList.add('css-window');
    }
  }

  private processNumericInput<T>(inputValue: T): void {
    if (typeof inputValue === 'string') {
      const num = Number(inputValue[0]);
      if (num <= this.listLevels.length && num > 0) {
        localStorage.level = num - 1;
        this.emmiter.emit('levelChange', true);
      }
    }
  }

  private addMarker<T>(inputValue: T): void {
    if (!inputValue) return;
    if (typeof inputValue === 'string' && inputValue.length !== 0) {
      if (Number(inputValue[0])) {
        this.processNumericInput<T>(inputValue);
        return;
      }
    }

    const tableField = document.querySelector('.table-field');
    const targetElements = tableField?.querySelectorAll(`${inputValue}`);
    if (targetElements) {
      targetElements.forEach((element) => {
        element.classList.add('find');
      });
    }
  }

  private removeMarker(): void {
    const tableField = document.querySelectorAll('.find');
    tableField?.forEach((element) => {
      element.classList.remove('find');
    });
  }

  private isTargetFound(): boolean {
    const target = document.querySelectorAll('.target');
    const find = document.querySelectorAll('.find');

    if (target.length !== find.length) {
      return false;
    }

    for (let i = 0; i < target.length; i += 1) {
      if (target[i].className !== find[i].className) {
        return false;
      }
    }

    this.writeWin(Number(localStorage.level));
    return true;
  }

  private writeWin(numberLevel: number): void {
    const level = this.listLevels[numberLevel];
    level.isWin = true;
    localStorage.level = numberLevel < this.listLevels.length - 1 ? numberLevel + 1 : 0;
    this.emmiter.emit('levelNext', true);
  }

  private addSnake(): void {
    document.querySelector('.input-field')?.classList.add('input-field_snake');
    setTimeout(() => {
      document.querySelector('.input-field')?.classList.remove('input-field_snake');
    }, 500);
  }

  private addHintInputField(): void {
    const input = this.elements.inputEnter;
    if (input) {
      if (input.value.length > 0) {
        input.value = '';
      }
      const letters = this.listLevels[Number(localStorage.level)].target.join(' ');
      if (letters) {
        this.addEffectPrint(letters);
      }
    }
  }

  private addEffectPrint(letters: string, index = 0): void {
    const input = document.querySelector('.css-input') as HTMLInputElement;
    const str = letters;
    if (index < str.length) {
      if (input) {
        input.value += str[index];
      }
      setTimeout(this.addEffectPrint.bind(this), 300, str, index + 1);
    }
  }

  private selectorInputArea(): void {
    window.addEventListener('load', () => {
      this.elements.inputEnter = document.querySelector('.css-input');
      this.elements.btnEnter = document.querySelector('.enter-button');
      this.elements.inputField = document.querySelector('.input-field');

      this.listenerEnterDown();
      this.listenerClickDown();
      this.listenerEnterUp();
      this.listenerClickUp();
    });
  }

  private handleInputEvent(inputValue: string, isEnterDown: boolean): void {
    this.addMarker<string>(inputValue);

    if (isEnterDown) {
      this.elements.btnEnter?.classList.add('enter-button_active');
      if (!this.isTargetFound()) {
        this.addSnake();
      }
    } else {
      this.elements.btnEnter?.classList.remove('enter-button_active');
      this.removeMarker();
    }
  }

  private listenerEnterDown(): void {
    this.elements.inputEnter?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        this.handleInputEvent(inputValue, true);
      }
    });
  }

  private listenerClickDown(): void {
    this.elements.btnEnter?.addEventListener('mousedown', () => {
      const event = this.elements.inputEnter;
      if (event) {
        const inputValue = event.value;
        this.handleInputEvent(inputValue, true);
      }
    });
  }

  private listenerEnterUp(): void {
    this.elements.inputEnter?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        this.handleInputEvent(inputValue, false);
      }
    });
  }

  private listenerClickUp(): void {
    this.elements.btnEnter?.addEventListener('mouseup', () => {
      const input = this.elements.inputEnter;
      if (input) {
        const inputValue = input.value;
        this.handleInputEvent(inputValue, false);
      }
    });
  }
}

export default Input;
