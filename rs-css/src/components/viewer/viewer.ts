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
    this.emmiter.subscribe('changeHoverLineEditHTML', (obj) => {
      if (typeof obj === 'object') {
        this.changeHoverLineEditHtml(obj.element, obj.isAdd, obj.index);
      }
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
      const className = element.className.includes('small') ? 'class="small"' : '';
      if (!isCentral) {
        tagsString += ' '.repeat(indent);
        if (element.children.length === 0) {
          tagsString += `<${tagName} ${className}/>\n`;
        } else {
          tagsString += `<${tagName}${className}>\n`;
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

    const tagName = target.replace(/<|>/g, '').replace('class="small"', '').split(' ');
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
    const tableElements = document.querySelector('.table-field') as HTMLElement;
    const element = tableElements.querySelectorAll(`${tagName?.join('')}`);
    console.log(indexEvent);
    const indexElement = (indexEvent <= editorLength / 2 && indexEvent !== 2) || element.length === 2 ? 0 : 1;
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

  public changeHoverLineEditHtml(element: HTMLElement, isAdd: boolean, index: number): void {
    // const tagName = element.tagName.toLocaleLowerCase();
    // const childrensLength = element.children.length;
    const editors = document.querySelector('.CodeMirror.html-window');
    const lines = editors?.querySelectorAll('.CodeMirror-line') as NodeListOf<HTMLElement>;
    const tableElements = document.querySelector('.table-field') as HTMLElement;
    const children = tableElements.querySelectorAll<HTMLElement>('*');
    let newIndex = index * 2 + 1;
    newIndex -= [...children].slice(0, index).filter((el) => el.children.length === 0).length;
    // newIndex = element.children.length === 0 ? newIndex - 1 : newIndex;
    if (isAdd) {
      lines[newIndex].classList.add('html-window__line_hover');
      if (element.children.length !== 0) {
        lines[newIndex + 2].classList.add('html-window__line_hover');
      }
      // console.log(children[index]);
      // console.log(lines[index]);
      console.log(newIndex);
    } else {
      lines[newIndex].classList.remove('html-window__line_hover');
      if (element.children.length !== 0) {
        lines[newIndex + 2].classList.remove('html-window__line_hover');
      }
    }
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
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: true, index: 0 });
          }
        });
        editor[i].addEventListener('mouseleave', (event) => {
          this.changeHoverLineEditWindow(event, editor, false, i);

          const element = this.processElementEditWindow(event, i, editor.length);
          if (element) {
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: false, index: 0 });
          }
        });
      }
    }
  }
}

export default Viewer;
