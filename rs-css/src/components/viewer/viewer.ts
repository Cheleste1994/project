import CodeMirror from 'codemirror';
import ListLevels from '../../assets/data/level.json';
import { EventData, LevelsInterface } from '../../assets/data/interface';

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

  private emmiter: EventEmitter<EventData>;

  constructor(emmiter: EventEmitter<EventData>) {
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
        this.hoverEventHandlingTable(obj.element, obj.isAdd, obj.index);
      }
    });
  }

  public start(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const editorRight = this.addEditorRight();
      if (editorRight) {
        this.load(Number(localStorage.level));
        this.addListenerClickEditWindow();
      }
    });
  }

  private addEditorRight(): CodeMirror.EditorFromTextArea {
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
    throw new Error('CodeMirror not found');
  }

  private load(numberLevel: number): void {
    const { firstLine, lastLine } = this.listLevels[numberLevel];
    const divElement = document.querySelector('.table-field');
    const tagsWithIndent = this.tagsElements(divElement).trim();

    this.codeMirrorInstance?.setValue(`${firstLine}\n ${tagsWithIndent}\n${lastLine}`);
  }

  public tagsElements(element: Element | null, indent = 0, isCentralTag = false, line = 0): string {
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

  private processElementEditWindow(target: HTMLElement, indexEvent: number): HTMLElement | null {
    const tableElements = document.querySelector('.table-field') as HTMLElement;
    const element = tableElements.querySelectorAll(`*`);
    const editors = document.querySelector('.CodeMirror.html-window');
    const elements = editors?.querySelectorAll('.CodeMirror-line') as NodeListOf<HTMLElement>;
    let count = 0;
    for (let i = 1; i <= indexEvent; i += 1) {
      if (elements[i].innerText.includes('</')) {
        count -= 1;
      }
      count += 1;
    }
    const tagName = target.innerText.trim().replace(/[<>/]/g, '');
    for (let i = count - 1; i >= 0; i -= 1) {
      if (element[i].tagName.toLocaleLowerCase() === tagName) {
        return element[i] as HTMLElement;
      }
    }
    return element[count - 1] as HTMLElement;
  }

  private changeHoverLineEditWindow(
    target: string,
    editor: NodeListOf<HTMLElement>,
    isAdd: boolean,
    indexElement: number,
  ): void {
    const tagName = target.trim().replace(/<|>/g, '').split(' ');
    if (isAdd) {
      for (let index = indexElement; index < editor.length; index += 1) {
        if (editor[index].innerText.trim() === target.trim()) {
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

  public hoverEventHandlingTable(element: HTMLElement, isAdd: boolean, index: number): void {
    const editors = document.querySelector('.CodeMirror.html-window');
    const lines = editors?.querySelectorAll('.CodeMirror-line') as NodeListOf<HTMLElement>;

    const attribute = element.getAttribute('data-content');
    if (attribute) {
      if (attribute?.includes('small') && isAdd) {
        return this.changeHoverLineEditWindow(attribute, lines, isAdd, index);
      }
      if (element.children.length === 0) {
        const newElement = `<${attribute.split(' ')[0].replace(/<|>/g, '')} />`;
        return this.changeHoverLineEditWindow(newElement, lines, isAdd, index);
      }
      if (isAdd) {
        return this.changeHoverLineEditWindow(attribute.split(' ')[0], lines, isAdd, index);
      }
    }
    return this.changeHoverLineEditWindow('', lines, false, index);
  }

  private addListenerClickEditWindow(): void {
    const editors = document.querySelector('.CodeMirror.html-window');
    const editor = editors?.querySelectorAll('.CodeMirror-line') as NodeListOf<HTMLElement>;
    if (editor) {
      for (let i = 1; i < editor.length - 1; i += 1) {
        editor[i].addEventListener('mouseenter', (event) => {
          const target = event.target as HTMLElement;
          this.changeHoverLineEditWindow(target.innerText, editor, true, i);

          const element = this.processElementEditWindow(target, i);
          if (element) {
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: true, index: 0 });
          }
        });
        editor[i].addEventListener('mouseleave', (event) => {
          const target = event.target as HTMLElement;
          this.changeHoverLineEditWindow(target.innerText, editor, false, i);

          const element = this.processElementEditWindow(target, i);
          if (element) {
            this.emmiter.emit('changeHoverELementTable', { element, isAdd: false, index: 0 });
          }
        });
      }
    }
  }
}

export default Viewer;
