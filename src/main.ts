import { program } from 'commander';
import { name, version } from '../package.json';
import { parseFileAsStream } from './reportGenerator';
import type { RawReport } from './reportGenerator';
import { consoleLogger } from './logger/console';
import { getTopResults } from './report/topResults';
import type { Logger } from './logger/type';

program
  .option('-f, --file <file>', 'log file to be parsed')
  .name(name)
  .version(version);

program.parse();

const options = program.opts();
const file = options.file ?? undefined;

const outputLogger = consoleLogger();

function printReport(report: RawReport, customLogger: Logger) {
  customLogger.log(`number of unique IP addresses: ${report.distinctIps.length}`);
  const sortedVisitedUrls = report.visitedUrlsCount.sort((a, b) => b.count - a.count);
  const topVisitedUrls = getTopResults(sortedVisitedUrls, 3);
  for (let i = 0; i < topVisitedUrls.length; i++) {
    customLogger.log(`top ${i + 1} most visited URLs: ${topVisitedUrls[i].item}`);
  }
  const sortedActiveIps = report.activityIpsCount.sort((a, b) => b.count - a.count);
  const topActiveIps = getTopResults(sortedActiveIps, 3);
  for (let i = 0; i < topActiveIps.length; i++) {
    customLogger.log(`top ${i + 1} most active IPs: ${topActiveIps[i].item}`);
  }
}
if (file) {
  parseFileAsStream(file, outputLogger)
    .then(report => printReport(report, outputLogger));
}
