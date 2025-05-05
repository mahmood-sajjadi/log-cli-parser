export interface logger {
  log: (str: string) => void;
  error: (str: string) => void;
}
