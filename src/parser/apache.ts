import type { Parser, AccessLog } from './types';

export const ApacheLogLineParser = (line: string): AccessLog => {
  const logPattern = /^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+)\s(\S+)\s(\S+)" (\d{3}) (\d+|-) "[^"]+" "([^"]+)"/;

  const match = line.match(logPattern);
  if (!match) {
    throw new Error("Invalid log format");
  }

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _,
    ip,
    logName,
    user,
    datetime,
    method,
    uri,
    protocol,
    status,
    size,
    agent,
  ] = match;

  return {
    accessTime: new Date(datetime),
    agent,
    ip,
    remoteLogName: logName,
    Request: {
      method,
      protocol,
      uri,
    },
    responseSize: size === '-' ? '-' : Number.parseInt(size, 10),
    statusCode: Number.parseInt(status, 10),
    user,
  }
}

/**
 * @deprecated Use `ApacheLogLineParser` instead. This function will be removed in version 2.0.
 */
export const ApacheLogFileParserFactory = (delimiter = '\n') => {
  const ApacheLogFileParser: Parser = (data: string) => {
    return data.split(delimiter).map(line => ApacheLogLineParser(line));
  }
  return ApacheLogFileParser;
}
