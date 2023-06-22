import Description from '../../help/description/description';
import Game from './app';

class Listeners extends Game {
  public description: Description;

  public elements: {
    inputEnter: HTMLInputElement | null;
    btnEnter: Element | null;
    inputField: Element | null;
  };

  constructor() {
    super();
    this.description = new Description(this.levels.listLevels);
    this.elements = {
      inputEnter: null,
      btnEnter: null,
      inputField: null,
    };
  }

  public listeners(): void {
    this.elements.inputEnter = document.querySelector('.css-input');
    this.elements.btnEnter = document.querySelector('.enter-button');
    this.elements.inputField = document.querySelector('.input-field');

    this.listenerEnterDown();
    this.listenerClickDown();
    this.listenerEnterUp();
    this.listenerClickUp();
  }

  private listenerEnterDown(): void {
    this.elements.inputEnter?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        this.input.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.add('enter-button_active');
        if (!this.input.findTarget()) {
          this.input.BOOM(true);
        }
      }
    });
  }

  private listenerClickDown(): void {
    this.elements.btnEnter?.addEventListener('mousedown', () => {
      const event = this.elements.inputEnter;
      if (event) {
        this.input.addMarker<string>(event.value);
        if (!this.input.findTarget()) {
          this.input.BOOM(true);
        }
      }
    });
  }

  private listenerEnterUp(): void {
    this.elements.inputEnter?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;

        this.handleTargetFound();

        this.input.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.remove('enter-button_active');
        const inputElement = event.target as HTMLInputElement;
        this.input.removeMarker();
        inputElement.value = '';
      }
    });
  }

  private listenerClickUp(): void {
    this.elements.btnEnter?.addEventListener('mouseup', () => {
      const input = this.elements.inputEnter;
      if (input) {
        let inputValue = input.value;

        this.handleTargetFound();
        this.input.addMarker<string>(inputValue);
        this.input.removeMarker();
        inputValue = '';
      }
    });
  }

  private handleTargetFound(): void {
    if (this.input.findTarget()) {
      const { codeMirrorInstance } = this.input;
      if (codeMirrorInstance) {
        const { level } = localStorage;
        this.table.loadTable(this.levels.listLevels[Number(level) + 1]);
        this.levels.load(codeMirrorInstance, level);
        this.input.writeWin(Number(level));
        localStorage.level = Number(level) + 1;
        this.description.loadLevelDescription();
      }
    }
  }
}

export default Listeners;
