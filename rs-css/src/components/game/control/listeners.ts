import Description from '../../help/description/description';
import Game from './app';

class Listeners extends Game {
  public description: Description;

  public elements: {
    inputEnter: Element | null;
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
    this.start();
  }

  public listeners(): void {
    this.elements.inputEnter = document.querySelector('.css-input');
    this.elements.btnEnter = document.querySelector('.enter-button');
    this.elements.inputField = document.querySelector('.input-field');

    this.listenerEnterDown();
    this.listenerEnterUp();
  }

  private listenerEnterDown(): void {
    this.elements.inputEnter?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        this.input.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.add('enter-button_active');
        if (!this.input.findTarget()) {
          this.elements.inputField?.classList.add('input-field_boom');
        }
      }
    });
  }

  private listenerEnterUp(): void {
    this.elements.inputEnter?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
      if (event instanceof KeyboardEvent && event.code === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
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
        this.input.addMarker<string>(inputValue);
        this.elements.btnEnter?.classList.remove('enter-button_active');
        this.elements.inputField?.classList.remove('input-field_boom');
        const inputElement = event.target as HTMLInputElement;
        this.input.removeMarker();
        inputElement.value = '';
      }
    });
  }
}

export default Listeners;
