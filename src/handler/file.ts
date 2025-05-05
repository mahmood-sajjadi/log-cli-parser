import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export function readLogFileByLine(path: string, callbacks: {
  read: (chunk: string) => void,
  close?: () => void,
  error?: (err: any) => void,
}): void {
  const readStream = createReadStream(path, {
    encoding: 'utf-8',
  });

  const readLine = createInterface({
    input: readStream,
    crlfDelay: Infinity, // To handle different line endings (CRLF or LF)
  });

  readLine.on('line', callbacks.read);
  if (callbacks.close) {
    readLine.on('close', callbacks.close);
  }
  if (callbacks.error) {
    readLine.on('error', callbacks.error);
  }
}
