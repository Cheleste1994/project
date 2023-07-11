import { EventData } from '../../assets/data/interface';
import EventEmitter from '../control/EventEmitter';

import Viewer from './viewer';

jest.mock('codemirror/lib/codemirror.css', () => {});
jest.mock('codemirror/theme/darcula.css', () => {});
jest.mock('codemirror/theme/3024-day.css', () => {});

let emitter: EventEmitter<EventData>;
let viewer: Viewer;

describe('Viewer', () => {
  beforeEach(() => {
    emitter = new EventEmitter();
    viewer = new Viewer(emitter);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create an instance of Viewer', () => {
    expect(viewer).toBeInstanceOf(Viewer);
  });

  it('should have the tagsElements method', () => {
    expect(viewer.tagsElements).toBeInstanceOf(Function);
  });

  it('should return the expected string of tags', () => {
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
