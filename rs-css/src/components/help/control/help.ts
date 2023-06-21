import './help.css';
import Choice from '../choice/choice';
import Progress from '../progress/progress';
import Game from '../../game/control/app';
import Description from '../description/description';

class Help extends Game {
  public choice: Choice;

  public progress: Progress;

  public description: Description;

  constructor() {
    super();
    this.choice = new Choice();
    this.progress = new Progress(this.levels.listLevels);
    this.description = new Description(this.levels.listLevels);
  }

  public start(): void {
    const burger = document.querySelector('.burger-menu__icon');
    burger?.addEventListener('click', () => {
      this.choice.toggleBurgerMenu(burger);
    });
    this.progress.loadLevelHeader();
    this.description.loadLevelDescription();
  }
}

export default Help;
