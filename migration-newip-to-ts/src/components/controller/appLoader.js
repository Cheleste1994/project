import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '1dd7f5f5fc9d4f6a9d71371c8f44d042', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
