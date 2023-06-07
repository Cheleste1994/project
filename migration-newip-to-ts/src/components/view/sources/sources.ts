import './sources.css';

interface ISources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

class Sources {
  public draw(data: ISources[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const itemNameElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
      const sourceItemElement = sourceClone.querySelector('.source__item') as HTMLElement;

      itemNameElement.textContent = item.name;
      sourceItemElement.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });
    const sources = document.querySelector('.sources') as HTMLElement;
    sources.append(fragment);
  }
}

export default Sources;
