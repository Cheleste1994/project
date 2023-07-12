class CarAdministrationController {
  constructor() {
    this.addListenerClickCarsCreate();
  }

  private addListenerClickCarsCreate(): void {
    document.querySelector('.cars-create__input')?.addEventListener('input', (event) => {
      console.log(event);
    });
  }
}

export default CarAdministrationController;
