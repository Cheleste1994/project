interface LevelsInterface {
  level: number;
  description: {
    [key: string]: string;
  };
  target: string[][];
  help: string;
  firstLine: string;
  lastLine: string;
  isWin: boolean;
  tag: (string | NestedTag)[];
}

interface NestedTag {
  [key: string]: string | string[] | NestedTag | undefined;
}

interface WinInfo {
  isWin: boolean;
  isHelp: boolean;
}

interface EventData {
  element: HTMLElement;
  isAdd: boolean;
  index: number;
}

export { LevelsInterface, NestedTag, WinInfo, EventData };
