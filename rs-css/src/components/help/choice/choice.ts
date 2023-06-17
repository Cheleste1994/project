import './choice.css';

class Choice {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  public toggleBurgerMenu(burgerIcon?: Element): void {
    const menu = document.querySelector('.burger-menu');
    menu?.classList.toggle('burger-menu_open');
    burgerIcon?.classList.toggle('burger-menu__icon_open');
  }
}

export default Choice;
