interface LevelsInterface {
  level: number;
  target: string[];
  firstLine: string;
  lastLine: string;
  tag: (string | NestedTag)[];
}

interface NestedTag {
  [key: string]: string | string[] | NestedTag | undefined;
}

export { LevelsInterface, NestedTag };
