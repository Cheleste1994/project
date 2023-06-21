import { LevelsInterface } from '../../game/control/interface';

class Progress {
  public json: LevelsInterface[];

  constructor(json: LevelsInterface[]) {
    this.json = json;
  }

  public loadLevelHeader(): void {
    const list = document.querySelector('.list-levels');
    const fragment = document.createDocumentFragment();
    this.json.forEach((data) => {
      const elementA = document.createElement('a');
      const elementCheckmark = document.createElement('span');
      elementCheckmark.classList.add('checkmark');

      if (data.win) {
        elementCheckmark.classList.add('checkmark_active');
      }

      const elementLevelNumber = document.createElement('span');
      elementLevelNumber.classList.add('level-number');
      elementLevelNumber.innerText = `${data.level + 1}`;
      elementA.appendChild(elementCheckmark);
      elementA.appendChild(elementLevelNumber);
      elementA.innerHTML += data.title;

      fragment.appendChild(elementA);
    });
    if (list) {
      list.innerHTML = '';
    }
    list?.appendChild(fragment);
  }
}

export default Progress;
