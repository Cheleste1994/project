import EventEmitter from '../appController/EventEmitter';

class RacingController {
  public emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>) {
    this.emitter = emitter;
    this.addListenerClickGarage();
  }

  private addListenerClickGarage(): void {
    document.querySelector('.garage__btn')?.addEventListener('click', () => {
      this.emitter.emit('garageBtnClick');
    });
  }
}

export default RacingController;
