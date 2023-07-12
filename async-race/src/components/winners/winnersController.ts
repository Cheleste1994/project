import EventEmitter from '../appController/EventEmitter';

class WinnersController {
  public emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>) {
    this.emitter = emitter;
    this.addListenerClickWinners();
  }

  private addListenerClickWinners(): void {
    document.querySelector('.winner__btn')?.addEventListener('click', () => {
      this.emitter.emit('winnerBtnClick');
    });
  }
}

export default WinnersController;
