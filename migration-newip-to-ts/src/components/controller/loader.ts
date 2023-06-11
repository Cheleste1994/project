class Loader {
  private readonly baseLink: string;

  public options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp({ endpoint = '', options = {}, value = '' }): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(this.load('GET', endpoint, options, value));
    });
  }

  private errorHandler<T extends Response>(res: T): T {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: object, endpoint = '', value = ''): string {
    const urlOptions: Record<string, string> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });
    url += value !== '' ? `${value}&` : '';
    return url.slice(0, -1);
  }

  private async load(method: string, endpoint: string, options = {}, value = ''): Promise<unknown> {
    return fetch(this.makeUrl(options, endpoint, value), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
}

export default Loader;
