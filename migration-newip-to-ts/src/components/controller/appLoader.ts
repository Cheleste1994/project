import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '38b01665a9ae439a914246b4bbca0f1f', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
