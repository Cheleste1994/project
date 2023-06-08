class Loader {
  private baseLink: string;

  public options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp({ endpoint = '', options = {} }): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(this.load('GET', endpoint, options));
    });
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: object, endpoint = ''): string {
    const urlOptions: Record<string, string> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private async load(method: string, endpoint: string, options = {}): Promise<unknown> {
    try {
      const res = await fetch(this.makeUrl(options, endpoint), { method });
      const res1 = this.errorHandler(res);
      return await res1.json();
    } catch (err) {
      return console.error(err);
    }
  }
}

export default Loader;
