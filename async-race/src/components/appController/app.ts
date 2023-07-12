import './app.css';
import CarAdministration from '../carAdministration/carAdministration';
import Racing from '../racing/racing';

class Controller {
  private carAdministration: CarAdministration;

  private racing: Racing;

  constructor() {
    this.carAdministration = new CarAdministration();
    this.racing = new Racing();
  }

  public start(): void {
    const body = document.querySelector('body');
    const header = document.createElement('header');
    const main = document.createElement('main');
    const btnGarage = document.createElement('button');
    const btnWinner = document.createElement('button');
    header.classList.add('header');
    main.classList.add('main');
    btnGarage.classList.add('garage__btn');
    btnGarage.innerText = 'TO GARAGE';
    btnGarage.setAttribute('type', 'button');
    btnWinner.classList.add('winner__btn');
    btnWinner.innerText = 'TO WINNER';
    btnWinner.setAttribute('type', 'button');
    header.appendChild(btnGarage);
    header.appendChild(btnWinner);
    body?.appendChild(header);
    body?.appendChild(main);

    const addBlockCarAdministration = this.carAdministration.createHTMLElementBlock(main);
    this.racing.createHTMLElementBlock(addBlockCarAdministration);
  }
}

export default Controller;
