interface LevelsInterface {
  level: number;
  title: string;
  description: {
    [key: string]: string;
  };
  target: string[];
  firstLine: string;
  lastLine: string;
  isWin: boolean;
  tag: (string | NestedTag)[];
}

interface NestedTag {
  [key: string]: string | string[] | NestedTag | undefined;
}

export { LevelsInterface, NestedTag };
