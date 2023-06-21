import { LevelsInterface } from '../../game/control/interface';

type SelectorType = {
  [key: string]: string;
};

const Selector: SelectorType = {
  selector: '.selector-name',
  title: 'h2.title',
  syntax: '.syntax',
  hint: '.hint',
  examples: '.example',
};

const WIDTHPROGRESSBAR = 100;

class Description {
  public json: LevelsInterface[];

  constructor(json: LevelsInterface[]) {
    this.json = json;
  }

  public loadLevelDescription(): void {
    const { description } = this.json[Number(localStorage.level)];
    Object.keys(Selector).forEach((name) => {
      if (typeof name === 'string') {
        const element = document.querySelector(Selector[`${name}`]);
        if (element) {
          element.innerHTML = description[name];
        }
      }
    });

    const levelNameText = document.querySelector('.level-name__text');
    const lengthJson = this.json.length;
    if (levelNameText) {
      levelNameText.innerHTML = `Level ${Number(localStorage.level) + 1} of ${lengthJson}`;
    }

    const progressLine = document.querySelector('.level-progress .progress') as HTMLElement;
    if (progressLine) {
      progressLine.style.width = `${(WIDTHPROGRESSBAR / lengthJson) * (Number(localStorage.level) + 1)}%`;
    }
  }
}

export default Description;
