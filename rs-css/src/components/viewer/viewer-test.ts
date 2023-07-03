import EventEmitter from '../control/EventEmitter';

import Viewer from './viewer';

jest.mock('codemirror/lib/codemirror.css', () => {});
jest.mock('codemirror/theme/darcula.css', () => {});
jest.mock('codemirror/theme/3024-day.css', () => {});

let emitter: EventEmitter;
let viewer: Viewer;

describe('Viewer', () => {
  beforeEach(() => {
    emitter = new EventEmitter();
    viewer = new Viewer(emitter);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('должен создаться экземпляр Viewer', () => {
    expect(viewer).toBeInstanceOf(Viewer);
  });
  it('должен содержать метод tagsElements', () => {
    expect(viewer.tagsElements).toBeInstanceOf(Function);
  });
  it('должен возвращать ожидаемую строку тегов', () => {
    const orangeElement = document.createElement('orange');
    const appleElement = document.createElement('apple');
    const childElement = document.createElement('bento');
    appleElement.appendChild(childElement);
    const expectedResult1 = `<apple>\n  <bento />\n</apple>\n`;
    const expectedResult2 = `<orange />\n`;

    const result1 = viewer.tagsElements(appleElement);
    const result2 = viewer.tagsElements(orangeElement);

    expect(result1).toEqual(expectedResult1);
    expect(result2).toEqual(expectedResult2);
  });
});
