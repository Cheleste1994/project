import './help.css';
import Choice from '../choice/choice';

class Help {
  public choice: Choice;

  constructor() {
    this.choice = new Choice();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public start() {
    console.log(123);
  }
}

export default Help;
