import { program } from 'commander';
import { name, version } from '../package.json';
import { parseFileAsStream } from './reportGenerator';
import { consoleLogger } from './logger/console';
import { getTopResults } from './report/topResults';

program
  .option('--file <file>', 'log file to be parsed')
  .name(name)
  .version(version);

program.parse();

const options = program.opts();
const file = options.file ?? undefined;

const logger = consoleLogger();

parseFileAsStream(file, logger).then(report => {
  logger.log(`number of unique IP addresses: ${report.distinctIps.length}`);
  const sortedVisitedUrls = report.visitedUrlsCount.sort((a, b) => b.count - a.count);
  const topVisitedUrls = getTopResults(sortedVisitedUrls, 3);
  for (let i = 0; i < topVisitedUrls.length; i++) {
    console.log(`top ${i + 1} most visited URLs: ${topVisitedUrls[i].item}`);
  }
  const sortedActiveIps = report.activityIpsCount.sort((a, b) => b.count - a.count);
  const topActiveIps = getTopResults(sortedActiveIps, 3);
  for (let i = 0; i < topActiveIps.length; i++) {
    console.log(`top ${i + 1} most active IPs: ${topActiveIps[i].item}`);
  }
});
