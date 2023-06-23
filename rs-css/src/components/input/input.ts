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

  private codeMirrorInstance: CodeMirror.EditorFromTextArea | undefined;

  private listLevels: LevelsInterface[];

  private elements: {
    inputEnter: HTMLInputElement | null;
    btnEnter: Element | null;
    inputField: Element | null;
  };

  public emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this.emmiter = emmiter;
    this.codeMirror = CodeMirror;
    this.listLevels = ListLevels;
    this.start();
    this.listeners();
    this.elements = {
      inputEnter: null,
      btnEnter: null,
      inputField: null,
    };
  }

  public start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.editorLeft();
    });
  }

  public editorLeft(): void {
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

  public addMarker<T>(inputValue: T): void {
    if (!inputValue) return;

    const tableField = document.querySelector('.table-field');
    const targetElements = tableField?.querySelectorAll(`${inputValue}`);
    if (targetElements) {
      targetElements.forEach((element) => {
        element.classList.add('find');
      });
    }
  }

  public removeMarker(): void {
    const tableField = document.querySelectorAll('.find');
    tableField?.forEach((element) => {
      element.classList.remove('find');
    });
  }

  public targetSearch(): boolean {
    const target = document.querySelectorAll('.target');
    const find = document.querySelectorAll('.find');
    let isFind = false;

    for (let i = 0; i < target.length; i += 1) {
      if (target.length !== find.length) {
        return false;
      }
      if (target[i].className !== find[i].className) {
        return false;
      }
      isFind = true;
    }
    if (isFind) {
      this.writeWin(Number(localStorage.level));
      return isFind;
    }
    return false;
  }

  public writeWin(numberLevel: number): void {
    const level = this.listLevels[numberLevel];
    level.win = true;
    localStorage.level = numberLevel < this.listLevels.length - 1 ? numberLevel + 1 : 0;
    this.emmiter.emit('targetFound', true);
  }

  public BOOM(isBoom: boolean): void {
    if (isBoom) {
      document.querySelector('.input-field')?.classList.add('input-field_boom');
      setTimeout(this.BOOM, 500);
    } else {
      document.querySelector('.input-field')?.classList.remove('input-field_boom');
    }
  }

  public listeners(): void {
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

  private listenerEnterDown(): void {
    this.elements.inputEnter?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        this.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.add('enter-button_active');
        if (!this.targetSearch()) {
          this.BOOM(true);
        }
      }
    });
  }

  private listenerClickDown(): void {
    this.elements.btnEnter?.addEventListener('mousedown', () => {
      const event = this.elements.inputEnter;
      if (event) {
        this.addMarker<string>(event.value);
        if (!this.targetSearch()) {
          this.BOOM(true);
        }
      }
    });
  }

  private listenerEnterUp(): void {
    this.elements.inputEnter?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;

        this.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.remove('enter-button_active');
        const inputElement = event.target as HTMLInputElement;
        this.removeMarker();
        inputElement.value = '';
      }
    });
  }

  private listenerClickUp(): void {
    this.elements.btnEnter?.addEventListener('mouseup', () => {
      const input = this.elements.inputEnter;
      if (input) {
        let inputValue = input.value;

        this.addMarker<string>(inputValue);
        this.removeMarker();
        inputValue = '';
      }
    });
  }
}

export default Input;
