import './input.css';

import CodeMirror from 'codemirror';
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
  public codeMirror: typeof CodeMirror;

  constructor() {
    this.codeMirror = CodeMirror;
  }

  public editorRight(): CodeMirror.EditorFromTextArea | undefined {
    const editor = document.querySelector('.html-window');
    if (editor instanceof HTMLTextAreaElement) {
      const codeMirrorInstance = this.codeMirror.fromTextArea(editor, {
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
      codeMirrorInstance.getWrapperElement().classList.add('html-window');
      return codeMirrorInstance;
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
}

export default Input;
