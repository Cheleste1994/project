import './global.css';
import Controller from './components/appController/app';

const contrroller = new Controller();
contrroller.start();

// async function start(): Promise<void> {
//   const response = await fetch('http://127.0.0.1:3000/garage');
//   console.log(response);
// }

// start();
