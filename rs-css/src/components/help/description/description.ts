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

class Description {
  public json: LevelsInterface[];

  constructor(json: LevelsInterface[]) {
    this.json = json;
  }

  public loadLevelDescription(): void {
    const { description } = this.json[localStorage.level];
    Object.keys(Selector).forEach((name) => {
      if (typeof name === 'string') {
        const element = document.querySelector(Selector[`${name}`]);
        if (element) {
          element.innerHTML = description[name];
        }
      }
    });
  }
}

export default Description;
