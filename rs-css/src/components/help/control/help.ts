import './help.css';
import Choice from '../choice/choice';

class Help {
  public choice: Choice;

  constructor() {
    this.choice = new Choice();
  }

  public start(): void {
    const burger = document.querySelector('.burger-menu__icon');
    burger?.addEventListener('click', () => {
      this.choice.toggleBurgerMenu(burger);
    });
  }
}

export default Help;
