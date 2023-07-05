import './input.css';
import CodeMirror from 'codemirror';
import ListLevels from '../../assets/data/level.json';
import { LevelsInterface, WinInfo } from '../../assets/data/interface';
import EventEmitter from '../control/EventEmitter';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';

const NON_LITERAL_SYMBOLS = /[<>{}[\]]/g;

class Input {
  private codeMirror: typeof CodeMirror;

  private listLevels: LevelsInterface[];

  private elements: {
    selectorInputArea: HTMLInputElement | null;
    btnEnter: Element | null;
  };

  private emmiter: EventEmitter;

  private winCollection: Map<number, WinInfo>;

  private codeMirrorInstance: CodeMirror.EditorFromTextArea | undefined;

  constructor(emmiter: EventEmitter, winCollection: Map<number, WinInfo>) {
    this.emmiter = emmiter;
    this.winCollection = winCollection;
    this.codeMirror = CodeMirror;
    this.listLevels = ListLevels;
    this.start();
    this.elements = {
      selectorInputArea: null,
      btnEnter: null,
    };
    this.emmiter.subscribe('help', this.addHintInputField.bind(this));
  }

  public start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.editorLeft();
      this.addListeners();
    });
  }

  private editorLeft(): CodeMirror.EditorFromTextArea {
    const editor = document.querySelector('.css-window');
    if (editor instanceof HTMLTextAreaElement) {
      this.codeMirrorInstance = this.codeMirror.fromTextArea(editor, {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'css',
        indentUnit: 2,
        indentWithTabs: true,
        theme: '3024-day',
        lineWrapping: true,
        viewportMargin: Infinity,
        firstLineNumber: 1,
        lineWiseCopyCut: false,
        undoDepth: 50,
        matchTags: { bothTags: true },
      });
      this.codeMirrorInstance.getWrapperElement().classList.add('css-window');
      return this.codeMirrorInstance;
    }
    throw new Error('CodeMirror not found');
  }

  private processNumericInput(num: number): void {
    if (num <= this.listLevels.length && num > 0) {
      localStorage.level = Math.trunc(num) - 1;
      this.emmiter.emit('levelChange');
    }
  }

  public addMarker(inputValue: string): void {
    if (!inputValue) return;
    if (typeof inputValue === 'string' && inputValue.length !== 0) {
      if (Number(inputValue)) {
        this.processNumericInput(Number(inputValue));
        return;
      }
    }

    const tableField = document.querySelector('.table-field');
    try {
      const targetElements = tableField?.querySelectorAll(`${inputValue}`);
      if (targetElements) {
        targetElements.forEach((element) => {
          element.classList.add('find');
        });
      }
    } catch {
      /* не найдено */
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
    return true;
  }

  private async addEventWin(): Promise<void> {
    const find = document.querySelectorAll('.find');

    await this.addWinReaction(find);
    this.writeWin(Number(localStorage.level));
    this.clearInputField();
    const isGameCompleted = [...this.winCollection.values()].every((level) => level.isWin === true);
    if (isGameCompleted) {
      this.gameCompleted();
    }
  }

  private gameCompleted(): void {
    const gameWin = document.querySelector('.game-win');
    gameWin?.classList.add('game-win_active');
    this.addListenerCLickGameCompleted();
    this.emmiter.emit('gameOver');
  }

  private async addWinReaction(elements: NodeListOf<Element>): Promise<void> {
    elements?.forEach((element) => element.classList.add('target_find'));
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  private clearInputField(): void {
    this.codeMirrorInstance?.replaceRange(
      '',
      { line: 0, ch: 0 },
      { line: 0, ch: this.codeMirrorInstance.getLine(0).length },
    );
  }

  private writeWin(numberLevel: number): void {
    const level = this.winCollection.get(numberLevel);
    if (level) {
      level.isWin = true;
    }
    localStorage.level = this.addLevelChangeCheck(numberLevel);
    this.emmiter.emit('levelChange');
  }

  private addLevelChangeCheck(numberLevel: number): number {
    const values = [...this.winCollection.values()];
    if (numberLevel < this.listLevels.length - 1) {
      const nextLevel = values.slice(numberLevel).findIndex((level) => level.isWin === false);
      if (nextLevel !== -1) {
        return numberLevel + nextLevel;
      }
    }
    const index = values.findIndex((level) => level.isWin === false);
    return index !== -1 ? index : 0;
  }

  private addSnake(): void {
    document.querySelector('.input-field')?.classList.add('input-field_snake');
    setTimeout(() => {
      document.querySelector('.input-field')?.classList.remove('input-field_snake');
    }, 1000);
  }

  private addHintInputField(): void {
    this.clearInputField();

    const letters = this.listLevels[Number(localStorage.level)].help;
    if (letters) {
      this.addEffectPrint(letters);
    }
    const level = this.winCollection.get(Number(localStorage.level));
    if (level) {
      level.isHelp = true;
    }
  }

  private addEffectPrint(letters: string, index = 0): void {
    if (index < letters.length) {
      const currentLine = this.codeMirrorInstance?.getLine(0);
      this.codeMirrorInstance?.replaceRange(
        currentLine + letters[index],
        { line: 0, ch: 0 },
        { line: 0, ch: this.codeMirrorInstance.getLine(0).length },
      );
      setTimeout(this.addEffectPrint.bind(this), 150, letters, index + 1);
    }
  }

  private addListeners(): void {
    window.addEventListener('load', () => {
      this.elements.selectorInputArea = document.querySelector('.css-input');
      this.elements.btnEnter = document.querySelector('.enter-button');

      this.listenerEnterDown();
      this.listenerClickDown();
      this.listenerEnterUp();
      this.listenerClickUp();
    });
  }

  private async handleInputEvent(inputValue: string, isEnterDown: boolean): Promise<void> {
    const value = inputValue.replace(NON_LITERAL_SYMBOLS, '');
    this.addMarker(value);

    if (isEnterDown) {
      this.elements.btnEnter?.classList.add('enter-button_active');

      if (!this.isTargetFound()) {
        this.addSnake();
      } else {
        await this.addEventWin();
      }
    } else {
      this.elements.btnEnter?.classList.remove('enter-button_active');
      this.removeMarker();
    }
  }

  private listenerEnterDown(): void {
    document.querySelector('.CodeMirror.css-window')?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = this.codeMirrorInstance?.getLine(0);
        if (inputValue) {
          this.handleInputEvent(inputValue, true);
        } else {
          this.handleInputEvent('', true);
        }
      }
    });
  }

  private listenerClickDown(): void {
    this.elements.btnEnter?.addEventListener('mousedown', () => {
      const inputValue = this.codeMirrorInstance?.getLine(0);
      if (inputValue) {
        this.handleInputEvent(inputValue, true);
      }
    });
  }

  private listenerEnterUp(): void {
    document.querySelector('.CodeMirror.css-window')?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = this.codeMirrorInstance?.getLine(0);
        if (inputValue) {
          this.handleInputEvent(inputValue, false);
        }
      }
    });
  }

  private listenerClickUp(): void {
    this.elements.btnEnter?.addEventListener('mouseup', () => {
      const inputValue = this.codeMirrorInstance?.getLine(0);
      if (inputValue) {
        this.handleInputEvent(inputValue, false);
      } else {
        this.handleInputEvent('', false);
      }
    });
  }

  private addListenerCLickGameCompleted(): void {
    const gameCompleted = document.querySelector('.game-win');
    gameCompleted?.addEventListener('click', () => {
      gameCompleted.classList.remove('game-win_active');
    });
  }
}

export default Input;
