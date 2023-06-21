import './input.css';
import CodeMirror from 'codemirror';
import Levels from '../levels/loadLevels';

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

class Input extends Levels {
  public codeMirror: typeof CodeMirror;

  public codeMirrorInstance: CodeMirror.EditorFromTextArea | undefined;

  constructor() {
    super();
    this.codeMirror = CodeMirror;
  }

  public editorRight(): CodeMirror.EditorFromTextArea | undefined {
    const editor = document.querySelector('.html-window');
    if (editor instanceof HTMLTextAreaElement) {
      this.codeMirrorInstance = this.codeMirror.fromTextArea(editor, {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'application/x-httpd-php',
        indentUnit: 2,
        indentWithTabs: true,
        theme: 'darcula',
        readOnly: true,
        lineWrapping: true,
        viewportMargin: Infinity,
      });
      this.codeMirrorInstance.getWrapperElement().classList.add('html-window');
      return this.codeMirrorInstance;
    }
    return undefined;
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

  public findTarget(): boolean {
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
    return isFind;
  }

  public writeWin(numberLevel: number): void {
    const level = this.listLevels[numberLevel];
    level.win = true;
  }
}

export default Input;
