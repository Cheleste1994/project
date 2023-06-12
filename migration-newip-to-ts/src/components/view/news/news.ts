import './news.css';
import { NewsResponse } from '../../types/interface';

enum Selector {
  NewsItem = '.news__item',
  MetaPhoto = '.news__meta-photo',
  MetaAuthor = '.news__meta-author',
  MetaDate = '.news__meta-date',
  DescriptionTitle = '.news__description-title',
  DescriptionSource = '.news__description-source',
  DescriptionContent = '.news__description-content',
  ReadMore = '.news__read-more a',
}

const MAX_NEWS_AMOUNT = 10;

class News {
  public draw(data: NewsResponse['articles']): void {
    const news = data.length >= MAX_NEWS_AMOUNT ? data.filter((_item, idx) => idx < MAX_NEWS_AMOUNT) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      const newsItem = newsClone.querySelector(Selector.NewsItem) as HTMLElement;
      const metaPhoto = newsClone.querySelector(Selector.MetaPhoto) as HTMLElement;
      const metaAuthor = newsClone.querySelector(Selector.MetaAuthor) as HTMLElement;
      const metaDate = newsClone.querySelector(Selector.MetaDate) as HTMLElement;
      const descriptionTitle = newsClone.querySelector(Selector.DescriptionTitle) as HTMLElement;
      const descriptionSource = newsClone.querySelector(Selector.DescriptionSource) as HTMLElement;
      const descriptionContent = newsClone.querySelector(Selector.DescriptionContent) as HTMLElement;
      const readMore = newsClone.querySelector(Selector.ReadMore) as HTMLElement;
      const urlPlaceholder = 'https://ajr.org/wp-content/themes/AJR-theme/images/news-placeholder.jpg';

      if (idx % 2) {
        newsItem.classList.add('alt');
      }
      metaPhoto.style.backgroundImage = `url(${item.urlToImage || urlPlaceholder})`;

      metaAuthor.textContent = item.author || item.source.name;
      metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      descriptionTitle.textContent = item.title;
      descriptionSource.textContent = item.source.name;
      descriptionContent.innerHTML = item.description;
      readMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const newsDocument = document.querySelector('.news') as HTMLElement;
    newsDocument.innerHTML = '';
    newsDocument.appendChild(fragment);
  }
}

export default News;
