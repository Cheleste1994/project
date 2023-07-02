interface LevelsInterface {
  level: number;
  description: {
    [key: string]: string;
  };
  target: string[][];
  firstLine: string;
  lastLine: string;
  isWin: boolean;
  tag: (string | NestedTag)[];
}

interface NestedTag {
  [key: string]: string | string[] | NestedTag | undefined;
}

interface WinInfo {
  level: number;
  isWin: boolean;
  isHelp: boolean;
}

export { LevelsInterface, NestedTag, WinInfo };
