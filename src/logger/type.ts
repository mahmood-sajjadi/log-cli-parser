export interface Logger {
  log: (str: string) => void;
  error: (str: string) => void;
}
