import CodeMirror from 'codemirror';
import ListLevels from '../../assets/data/level.json';
import { LevelsInterface } from '../../assets/data/interface';

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
import EventEmitter from '../control/EventEmitter';

class Viewer {
  private codeMirror: typeof CodeMirror;

  private codeMirrorInstance: CodeMirror.EditorFromTextArea | undefined;

  private listLevels: LevelsInterface[];

  private emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this.emmiter = emmiter;
    this.codeMirror = CodeMirror;
    this.listLevels = ListLevels;
    this.start();
    this.emmiter.subscribe('levelChange', () => this.load(Number(localStorage.level)));
    this.emmiter.subscribe('levelNext', () => this.load(Number(localStorage.level)));
    this.emmiter.subscribe('levelPrev', () => this.load(Number(localStorage.level)));
  }

  private start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const editorRight = this.addEditorRight();
      if (editorRight) {
        this.load(Number(localStorage.level));
      }
    });
  }

  private addEditorRight(): CodeMirror.EditorFromTextArea | undefined {
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

  private load(numberLevel: number): void {
    const { firstLine, lastLine } = this.listLevels[numberLevel];
    const divElement = document.querySelector('.table-field');
    const tagsWithIndent = this.tagsElements(divElement).trim();

    this.codeMirrorInstance?.setValue(`${firstLine}\n ${tagsWithIndent}\n${lastLine}`);
  }

  private tagsElements(element: Element | null, indent = 0, isCentralTag = false): string {
    let tagsString = '';

    if (element !== null) {
      const tagName = element.tagName.toLowerCase();
      const isCentral = isCentralTag || tagName === 'div';

      if (!isCentral) {
        tagsString += ' '.repeat(indent);
        if (element.children.length === 0) {
          tagsString += `<${tagName} />\n`;
        } else {
          tagsString += `<${tagName}>\n`;
        }
      }

      for (let i = 0; i < element.children.length; i += 1) {
        const childElement = element.children[i];
        tagsString += this.tagsElements(childElement, indent + 2, isCentralTag);
      }

      if (!isCentral && element.children.length > 0) {
        tagsString += ' '.repeat(indent);
        tagsString += `</${tagName}>\n`;
      }
    }

    return tagsString;
  }
}

export default Viewer;
