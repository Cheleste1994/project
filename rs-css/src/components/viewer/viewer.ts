import CodeMirror from 'codemirror';
import ListLevels from '../../assets/data/level.json';
import { LevelsInterface } from '../../assets/data/interface';

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
    this.emmiter.subscribe('levelChange', () => {
      this.load(Number(localStorage.level));
      this.addListenerClickEditWindow();
    });
  }

  private start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const editorRight = this.addEditorRight();
      if (editorRight) {
        this.load(Number(localStorage.level));
        this.addListenerClickEditWindow();
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
        // matchTags: { bothTags: true },
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

  private tagsElements(element: Element | null, indent = 0, isCentralTag = false, line = 0): string {
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
        tagsString += this.tagsElements(childElement, indent + 2, isCentralTag, line + 1);
      }

      if (!isCentral && element.children.length > 0) {
        tagsString += ' '.repeat(indent);
        tagsString += `</${tagName}>\n`;
      }
    }

    return tagsString;
  }

  private processElementEditWindow(event: Event, indexEvent: number, editorLength: number): HTMLElement | null {
    const target = (event.target as HTMLElement).innerText;
    const tagName = target.replace(/<|>/g, '').split(' ');
    tagName?.forEach((el, index) => {
      tagName[index] = el.trim();
      if (index === 0) {
        tagName[index] = '.table-field > ';
      }
      if (el.trim() === '') {
        tagName[index] = '* > ';
      }
      if (el === '/') {
        tagName[index] = '';
      }
      if (el.includes('/') && el.length > 0) {
        tagName[index] = el.trim().slice(1);
      }
    });
    const element = document.querySelectorAll(`${tagName?.join('')}`);
    const indexElement = indexEvent <= editorLength / 2 && indexEvent !== 2 ? 0 : 1;
    console.log(indexEvent);
    return element[indexElement] as HTMLElement;
  }

  private changeHoverLineEditWindow(
    event: Event,
    editor: NodeListOf<HTMLElement>,
    isAdd: boolean,
    indexElement: number,
  ): void {
    const target = (event.target as HTMLElement).innerText;
    const tagName = target.trim().replace(/<|>/g, '').split(' ');
    if (isAdd) {
      for (let index = indexElement; index < editor.length; index += 1) {
        if (editor[index].innerText === target) {
          editor[index].classList.add('html-window__line_hover');
          if (tagName.length === 1) {
            if (tagName[0].includes('/')) {
              for (let i = index - 1; i >= 0; i -= 1) {
                const tag = target.replace(/[\s<>]/g, '');
                if (editor[i].innerText.includes(tag.slice(1))) {
                  editor[i].classList.add('html-window__line_hover');
                  return;
                }
              }
            } else {
              for (let i = index + 1; i < editor.length; i += 1) {
                if (editor[i].innerText.includes(`/${tagName[0]}`)) {
                  editor[i].classList.add('html-window__line_hover');
                  return;
                }
              }
            }
          }
          return;
        }
      }
    }
    editor.forEach((el) => el.classList.remove('html-window__line_hover'));
  }

  private addListenerClickEditWindow(): void {
    const editors = document.querySelector('.CodeMirror.html-window');
    const editor = editors?.querySelectorAll('.CodeMirror-line') as NodeListOf<HTMLElement>;
    if (editor) {
      for (let i = 1; i < editor.length - 1; i += 1) {
        editor[i].addEventListener('mouseenter', (event) => {
          this.changeHoverLineEditWindow(event, editor, true, i);

          const element = this.processElementEditWindow(event, i, editor.length);
          if (element) {
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: true });
          }
        });
        editor[i].addEventListener('mouseleave', (event) => {
          this.changeHoverLineEditWindow(event, editor, false, i);

          const element = this.processElementEditWindow(event, i, editor.length);
          if (element) {
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: false });
          }
        });
      }
    }
    // this.codeMirrorInstance?.on('cursorActivity', (event) => {
    //   const line = event.getCursor();
    //   console.log(event.getLine(line.line));
    // });
  }
}

export default Viewer;
