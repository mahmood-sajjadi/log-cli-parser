import { readLogFileByLine } from './handler/file';
import { ApacheLogLineParser } from './parser/apache';
import { countInStream } from './report/count';
import type { countResult } from './report/count';
import { distinctInStream } from './report/distinct';
import type { Logger } from './logger/type';
import type { AccessLog, LineParser } from './parser/types';

export interface RawReport {
  distinctIps: string[];
  visitedUrlsCount: countResult<string>;
  activityIpsCount: countResult<string>;
}

export function parseLine(rawLineData: string, config: {
  parser: LineParser
}): AccessLog {
  return config.parser(rawLineData);
}

// TODO: to make it more generic, it needs to accept list of reporter functions
// and their configurations. then this function will loop them all to generate
// all the reports
export function addToReport(reportResult: RawReport, data: AccessLog): RawReport {
  // countInStream will mutate the report
  reportResult.visitedUrlsCount = countInStream(reportResult.visitedUrlsCount, data.Request.uri);
  reportResult.activityIpsCount = countInStream(reportResult.activityIpsCount, data.ip);
  // distinctInStream will mutate the report
  reportResult.distinctIps = distinctInStream(reportResult.distinctIps, data.ip);

  return reportResult;
}

export function parseFileAsStream(file: string, customLogger: Logger) {
  return new Promise<RawReport>((resolve) => {
    let report: RawReport = {
      distinctIps: [],
      visitedUrlsCount: [],
      activityIpsCount: [],
    };

    const read = (line: string) => {
      const data = parseLine(line, {
        parser: ApacheLogLineParser,
      });
      // because of inner functions, addToReportFromStream will mutate the report
      report = addToReport(report, data);
    }
    const close = () => {
      resolve(report);
    }
    const error = (err: any) => {
      // TODO: to log the error or handle it better,
      // for now I ignore the error and log it in console only
      customLogger.error(`error on parsing the file: ${err}`);
    }
    readLogFileByLine(file, {
      read,
      close,
      error,
    });
  });
}
