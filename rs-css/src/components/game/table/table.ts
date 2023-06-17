import './table.css';

class Table {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public toogleStuck() {
    const stuck = document.querySelector('.stuck-open');
    stuck?.classList.toggle('stuck-open_active');
  }
}

export default Table;
