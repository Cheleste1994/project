import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: '38b01665a9ae439a914246b4bbca0f1f', // получите свой ключ https://newsapi.org/
      // второй ключ 1dd7f5f5fc9d4f6a9d71371c8f44d042
    });
  }
}

export default AppLoader;
