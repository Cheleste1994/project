interface LevelsInterface {
  level: number;
  set: string[];
  firstLine: string;
  lastLine: string;
  tag: (string | NestedTag)[];
}

interface NestedTag {
  [key: string]: string | string[] | NestedTag | undefined;
}

export { LevelsInterface, NestedTag };
