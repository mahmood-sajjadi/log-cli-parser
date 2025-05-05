import type { logger } from './type';

export function consoleLogger(): logger {
  const log = (str: string) => console.log(str);
  const error = (str: string) => console.error(str);
  return {
    log,
    error,
  }
}
